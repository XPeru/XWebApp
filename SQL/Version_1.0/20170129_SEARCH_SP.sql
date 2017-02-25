USE testdb;
DROP PROCEDURE IF EXISTS `SP_SEARCH_ALL`;

USE testdb;
DROP PROCEDURE IF EXISTS `SP_SEARCH`;

DELIMITER $$
USE testdb$$
CREATE PROCEDURE `SP_SEARCH_ALL` (IN tab_name varchar(100))
BEGIN
	SET @query = CONCAT ('SELECT * FROM ',tab_name);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;  
END$$
DELIMITER ;

DELIMITER $$
USE testdb$$
CREATE PROCEDURE `SP_SEARCH` (IN tab_name varchar(100), IN col_name varchar(50), IN col_value varchar(50))
BEGIN
	SET @query = CONCAT ('SELECT * FROM ',tab_name,' WHERE ',col_name,' = ',col_value);
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;  
END$$
DELIMITER ;

DELIMITER $$
USE testdb$$
CREATE PROCEDURE `SP_SEARCH_STRING` (IN tab_name varchar(100), IN col_name varchar(50), IN col_value varchar(50))
BEGIN
	SET @query = CONCAT ('SELECT * FROM ',tab_name,' WHERE ',col_name,' = `',col_value,'`');
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;  
END$$
DELIMITER ;