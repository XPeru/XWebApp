# Version 1.0 

key_low=""
key_up=""
key_min=""

if [[ $# -eq 0 ]] ; then
	echo 'Argumentos insuficientes'
	echo "Uso: $0 string1 string2 ..."
	exit 1
else
	for var in "$@"; do
		#statements
		tempo="$var"
		tempo=`echo $tempo | tr '[:upper:]' '[:lower:]'`
		if [[ "$key_low" = "" ]] ; then
			key_min="$tempo"
			key_low="$tempo"
			key_up=`echo $tempo | awk '{ print toupper(substr($0, 1, 1)) substr($0, 2) }'`
		else
			key_min="$key_min""$tempo"
			tempo=`echo $tempo | awk '{ print toupper(substr($0, 1, 1)) substr($0, 2) }'`
			key_low="$key_low""$tempo"
			key_up="$key_up""$tempo"
		fi
	done
fi

ReplaceString(){
	cat $1 | sed "s/#patternL#/$key_low/g" | \
		sed "s/#patternU#/$key_up/g" | sed "s/#patternM#/$key_min/g"  > $2
}

cd ../
OUTPUT_PATH="`pwd`/dev/"
OUTPUT_DAO_PATH="`pwd`/DAO/"
OUTPUT_MODULE_PATH=$OUTPUT_PATH'modules/'$key_up'/'
mkdir -p $OUTPUT_MODULE_PATH
# mkdir -p $OUTPUT_DAO_PATH
# rm -rf $OUTPUT_MODULE_PATH
# OUTPUT_MODAL_PATH=$OUTPUT_MODULE_PATH'modals/'
# mkdir -p $OUTPUT_MODAL_PATH
cd Templates

while true; do
    read -p "Desea iniciar creacion de modulos Service, Controller y DAO? (y/n) " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) echo OPERACION CANCELADA; exit 0;;
        * ) echo "Por favor conteste (y) o (n)";;
    esac
done
echo
echo "****************************************************************************************************"
echo Modulo Service
echo
OUTPUT_FILE=$OUTPUT_MODULE_PATH$key_low'Service.js'
echo Archivo a crear: "$OUTPUT_FILE"
echo Generando modulo Service...
ReplaceString "template_service.txt" $OUTPUT_FILE
echo Archivo Service creado
echo "****************************************************************************************************"
echo Modulo Controller
echo 
OUTPUT_FILE=$OUTPUT_MODULE_PATH$key_low'Controller.js'
echo Archivo a crear: "$OUTPUT_FILE"
echo Generando modulo Controller...
ReplaceString "template_controller.txt" $OUTPUT_FILE
echo Archivo Controller creado
echo "****************************************************************************************************"
echo Modulo DAO
echo
OUTPUT_FILE=$OUTPUT_DAO_PATH$key_low'DAO.js'
echo Archivo a crear: "$OUTPUT_FILE"
echo Generando modulo DAO...
ReplaceString "template_dao.txt" $OUTPUT_FILE
echo Archivo DAO creado
echo "****************************************************************************************************"
echo OPERACION TERMINADA CON EXITO 
exit 0
