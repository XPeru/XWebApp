ALTER TABLE `testdb`.`DETALLE_INGRESO` 
ADD UNIQUE INDEX `UQ_ING_ALM_ART` (`FK_INGRESO` ASC, `FK_ALMACEN` ASC, `FK_ARTICULO` ASC);
