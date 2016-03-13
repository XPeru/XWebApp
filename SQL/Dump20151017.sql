/*
-- Query: SELECT * FROM testdb.TBL_ART
LIMIT 0, 1000

-- Date: 2015-10-17 14:01
*/
INSERT INTO `TBL_ART` (`ART_SEQ`,`ID_ART`,`DESC`,`CANT_MED`,`VAL_REP`,`PR_UNIT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,'PBG1K250A','PORCELANA PASATAPAS BT 1 KV - 250 A (2 pz), GAMMA 5232','Unidad',NULL,10.00,'1','2015-10-17 13:37:25',NULL);
INSERT INTO `TBL_ART` (`ART_SEQ`,`ID_ART`,`DESC`,`CANT_MED`,`VAL_REP`,`PR_UNIT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,'PAG25K','PORCELANA PASATAPAS AT 25 KV - 250 A , GAMMA 5286','Unidad',NULL,30.00,'1','2015-10-17 13:40:36',NULL);
INSERT INTO `TBL_ART` (`ART_SEQ`,`ID_ART`,`DESC`,`CANT_MED`,`VAL_REP`,`PR_UNIT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (3,'PAG34K','PORCELANA PASATAPAS AT 34.5 KV - 250 A , GAMMA 5285','Unidad',NULL,35.00,'1','2015-10-17 13:40:36',NULL);
INSERT INTO `TBL_ART` (`ART_SEQ`,`ID_ART`,`DESC`,`CANT_MED`,`VAL_REP`,`PR_UNIT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (4,'PAG45K','PORCELANA PASATAPAS AT 45 KV - 250 A , GAMMA 5295','Unidad',NULL,80.00,'1','2015-10-17 13:40:36',NULL);
INSERT INTO `TBL_ART` (`ART_SEQ`,`ID_ART`,`DESC`,`CANT_MED`,`VAL_REP`,`PR_UNIT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (5,'PAC10K250A','PORCELANA PASATAPAS AT 45 KV - 250 A , GAMMA 5295','Unidad',24,29.00,'1','2015-10-17 13:40:36',NULL);

INSERT INTO `TBL_ALM` (`ALM_SEQ`,`ID_ALM`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,'A','1','2015-10-17 13:47:31',NULL);
INSERT INTO `TBL_ALM` (`ALM_SEQ`,`ID_ALM`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,'B1','1','2015-10-17 13:47:39',NULL);

INSERT INTO `TBL_ALM_DET` (`ALM_DET_SEQ`,`ALM_SEQ`,`ID_ART`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,1,'PBG1K250A',15.00,'1','2015-10-17 14:05:15',NULL);
INSERT INTO `TBL_ALM_DET` (`ALM_DET_SEQ`,`ALM_SEQ`,`ID_ART`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,1,'PAG25K',25.00,'1','2015-10-17 14:05:15',NULL);
INSERT INTO `TBL_ALM_DET` (`ALM_DET_SEQ`,`ALM_SEQ`,`ID_ART`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (3,1,'PAG34K',15.00,'1','2015-10-17 14:05:15',NULL);
INSERT INTO `TBL_ALM_DET` (`ALM_DET_SEQ`,`ALM_SEQ`,`ID_ART`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (4,2,'PAG45K',25.00,'1','2015-10-17 14:05:15',NULL);
INSERT INTO `TBL_ALM_DET` (`ALM_DET_SEQ`,`ALM_SEQ`,`ID_ART`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (5,2,'PAC10K250A',15.00,'1','2015-10-17 14:05:15',NULL);

INSERT INTO `TBL_ING` (`ING_SEQ`,`ID_ING`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,'15-09-11-B2','1','2015-10-17 14:09:43',NULL);
INSERT INTO `TBL_ING` (`ING_SEQ`,`ID_ING`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,'16-09-11-C','1','2015-10-17 14:09:43',NULL);
INSERT INTO `TBL_ING` (`ING_SEQ`,`ID_ING`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (3,'16-10-13','1','2015-10-17 14:09:43',NULL);
INSERT INTO `TBL_ING` (`ING_SEQ`,`ID_ING`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (4,'17-05-12-A','1','2015-10-17 14:09:43',NULL);
INSERT INTO `TBL_ING` (`ING_SEQ`,`ID_ING`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (5,'17-05-12-A2','1','2015-10-17 14:09:43',NULL);

INSERT INTO `TBL_ING_DET` (`ING_DET_SEQ`,`ING_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,1,'PBG1K250A','A',5.00,'1','2015-10-17 14:15:15',NULL);
INSERT INTO `TBL_ING_DET` (`ING_DET_SEQ`,`ING_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,1,'PAG34K','A',1.00,'1','2015-10-17 14:18:59',NULL);
INSERT INTO `TBL_ING_DET` (`ING_DET_SEQ`,`ING_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (3,2,'PAG25K','A',3.00,'1','2015-10-17 14:18:59',NULL);
INSERT INTO `TBL_ING_DET` (`ING_DET_SEQ`,`ING_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (4,3,'PAG34K','A',2.00,'1','2015-10-17 14:18:59',NULL);
INSERT INTO `TBL_ING_DET` (`ING_DET_SEQ`,`ING_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (5,4,'PAG25K','A',2.00,'1','2015-10-17 14:18:59',NULL);
INSERT INTO `TBL_ING_DET` (`ING_DET_SEQ`,`ING_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (6,5,'PAG34K','A',1.00,'1','2015-10-17 14:18:59',NULL);

INSERT INTO `TBL_SAL` (`SAL_SEQ`,`ID_SAL`,`ORD`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,'06-03-12-A',NULL,'1','2015-10-17 14:22:22',NULL);
INSERT INTO `TBL_SAL` (`SAL_SEQ`,`ID_SAL`,`ORD`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,'06-03-12-B1',NULL,'1','2015-10-17 14:22:22',NULL);
INSERT INTO `TBL_SAL` (`SAL_SEQ`,`ID_SAL`,`ORD`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (3,'06-12-12-A',NULL,'1','2015-10-17 14:22:22',NULL);

INSERT INTO `TBL_SAL_DET` (`SAL_DET_SEQ`,`SAL_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (1,1,'PAC10K250A','B1',4.00,'1','2015-10-17 14:24:40',NULL);
INSERT INTO `TBL_SAL_DET` (`SAL_DET_SEQ`,`SAL_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (2,1,'PAG45K','B1',9.00,'1','2015-10-17 14:24:40',NULL);
INSERT INTO `TBL_SAL_DET` (`SAL_DET_SEQ`,`SAL_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (3,2,'PAC10K250A','B1',5.00,'1','2015-10-17 14:24:40',NULL);
INSERT INTO `TBL_SAL_DET` (`SAL_DET_SEQ`,`SAL_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (4,2,'PAG45K','B1',2.00,'1','2015-10-17 14:24:40',NULL);
INSERT INTO `TBL_SAL_DET` (`SAL_DET_SEQ`,`SAL_SEQ`,`ID_ART`,`ID_ALM`,`CANT`,`ACT_FLG`,`CRT_TIM`,`UPD_TIM`) VALUES (5,3,'PAG45K','B1',4.00,'1','2015-10-17 14:24:40',NULL);
