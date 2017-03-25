USE testdb;
DROP PROCEDURE IF EXISTS SP_PROCESS_MVMT;

DELIMITER $$
CREATE PROCEDURE SP_PROCESS_MVMT (IN process_type varchar(5), IN mvmt_type varchar(20), IN mvmt_id int(11))
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE `_done` INT DEFAULT FALSE;
    DECLARE cursor_ID_ALM INT;
    DECLARE cursor_ID_ART INT;
    DECLARE cursor_VAL INT;
    DECLARE cursor_i CURSOR FOR SELECT * FROM temporal;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET `_done` = TRUE;

    SET @table = mvmt_type;
    SET @id_table = CONCAT('ID_',@table);
    SET @table_detail = CONCAT('DETALLE_',@table);
    SET @fk_id_table = CONCAT('FK_',@table);
    SET @tmp_str = CONCAT('CREATE TEMPORARY TABLE temporal AS ', 'SELECT TD.FK_ALMACEN AS ID_ALM, TD.FK_ARTICULO AS ID_ART, TD.CANTIDAD AS VAL FROM ',@table,' T, ',@table_detail,' TD WHERE T.',@id_table,' = TD.',@fk_id_table,' AND T.',@id_table,' = ',mvmt_id);
    PREPARE tmp_stmt FROM @tmp_str;
    DROP TEMPORARY TABLE IF EXISTS temporal;
    EXECUTE tmp_stmt;
    DEALLOCATE PREPARE tmp_stmt;
    
    START TRANSACTION;
    OPEN cursor_i;
    SET @ins_str = 'INSERT INTO DETALLE_ALMACEN (CANTIDAD,IS_ACTIVE,FK_ALMACEN,FK_ARTICULO) VALUES (?,1,?,?) ON DUPLICATE KEY UPDATE CANTIDAD = CANTIDAD + ?';
    PREPARE ins_stmt FROM @ins_str;
    read_loop: LOOP
        FETCH cursor_i INTO cursor_ID_ALM, cursor_ID_ART, cursor_VAL;
        IF ((process_type = 'DEL'  AND mvmt_type = 'INGRESO') OR (process_type = 'ADD' AND mvmt_type = 'SALIDA')) THEN 
            SET @a = -cursor_VAL;
        ELSE SET @a = cursor_VAL;
        END IF;
        SET @b = cursor_ID_ALM;
        SET @c = cursor_ID_ART;
        IF `_done` THEN
            LEAVE read_loop;
        END IF;
        EXECUTE ins_stmt USING @a, @b, @c, @a;
    END LOOP;
    CLOSE cursor_i;
    DEALLOCATE PREPARE ins_stmt;
    IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;

