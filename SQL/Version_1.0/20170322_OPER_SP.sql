USE testdb;
DROP PROCEDURE IF EXISTS SP_PROCESS_MVMT;

DELIMITER $$
CREATE PROCEDURE SP_PROCESS_MVMT (IN mvmt_type varchar(20), IN mvmt_id int(11))
BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cursor_ID_ALM INT;
    DECLARE cursor_ID_ART INT;
  	DECLARE cursor_VAL INT;
  	DECLARE cursor_i CURSOR FOR SELECT * FROM temporal;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	SET @table = mvmt_type;
    SET @id_table = CONCAT('ID_',@table);
    SET @table_detail = CONCAT('DETALLE_',@table);
    SET @fk_id_table = CONCAT('FK_',@table);
	SET @v = CONCAT('CREATE TEMPORARY TABLE temporal AS ', 'SELECT TD.FK_ALMACEN AS ID_ALM, TD.FK_ARTICULO AS ID_ART, TD.CANTIDAD AS VAL FROM ',@table,' T, ',@table_detail,' TD WHERE T.',@id_table,' = TD.',@fk_id_table,' AND T.',@id_table,' = ',mvmt_id);
	PREPARE stmt FROM @v;
	DROP TEMPORARY TABLE IF EXISTS temporal;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
    
    -- SET @sel = CONCAT ('SELECT T.*, TD.* FROM ',@table,' T, ',@table_detail,' TD WHERE T.',@id_table,' = TD.',@fk_id_table);
    -- PREPARE stmt FROM @sel;
    START TRANSACTION;
    OPEN cursor_i;
    read_loop: LOOP
    	FETCH cursor_i INTO cursor_ID_ALM, cursor_ID_ART, cursor_VAL;
    	IF done THEN
      		LEAVE read_loop;
    	END IF;
    	INSERT INTO DETALLE_ALMACEN(CANTIDAD,IS_ACTIVE,FK_ALMACEN,FK_ARTICULO) VALUES (cursor_VAL,1,cursor_ID_ALM,cursor_ID_ART); 
    END LOOP;
	CLOSE cursor_i;
    
    IF `_rollback` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END$$
DELIMITER ;

