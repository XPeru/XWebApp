echo
echo
# echo Version numero 1 
# echo ----------------------------------------------------------------------------------------------------
# echo Ingrese el nombre del modulo que desea crear:
# read module_name
# echo 
# key_low=`echo $module_name | tr '[:upper:]' '[:lower:]'`
# echo  "Patron en minusculas : $key_low"
# echo
# echo
# echo 
# key_up=`echo $module_name | awk '{ print toupper(substr($0, 1, 1)) substr($0, 2) }'`
# echo "Patron con mayusculas $key_up"
# echo
echo ----------------------------------------------------------------------------------------------------

key_low=""
key_up=""
key_min=""

if [[ $# -eq 0 ]] ; then
	echo 'Argumentos insuficientes'
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

echo ----------------------------------------------------------------------------------------------------

echo Antes de pasar a la generacion de archivos, vamos a guardar en memoria los paths necesarios
echo
echo "Creacion del directorio del modulo $key_up"
echo Aqui se debe agregar un ifpara que si el directorio ya existe, no se tenga que crear denuevo
echo
echo

cd ../
OUTPUT_PATH="`pwd`/dev/"
OUTPUT_MODULE_PATH=$OUTPUT_PATH'modules/'$key_up'/'
mkdir -p $OUTPUT_MODULE_PATH
# rm -rf $OUTPUT_MODULE_PATH
# OUTPUT_MODAL_PATH=$OUTPUT_MODULE_PATH'modals/'
# OUTPUT_DAO_PATH=$OUTPUT_PATH'DAO/'
# mkdir -p $OUTPUT_MODAL_PATH
# mkdir -p $OUTPUT_DAO_PATH
cd Templates

echo ----------------------------------------------------------------------------------------------------
echo Generador del modulo Service
echo
sh ./generate_service.sh $key_low $key_up $key_min $OUTPUT_MODULE_PATH
echo ----------------------------------------------------------------------------------------------------
echo Generador del modulo Controller
echo


