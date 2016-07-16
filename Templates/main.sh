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

if [[ $# -eq 0 ]] ; then
	echo 'Argumentos insuficientes'
	exit 1
else
	for var in "$@"; do
		#statements
		tempo="$var"
		tempo=`echo $tempo | tr '[:upper:]' '[:lower:]'`
		if [[ "$key_low" = "" ]] ; then
			key_low="$tempo"
			key_up=`echo $tempo | awk '{ print toupper(substr($0, 1, 1)) substr($0, 2) }'`
		else
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
pwd=$(pwd)
echo $pwd
template_path=$(pwd)
cd ..
pwd=$(pwd)
echo $pwd

cd dev
cd modules
pwd=$(pwd)
echo $pwd
mkdir $key_up
cd $key_up
pwd=$(pwd)
echo $pwd
module_path=$(pwd)

echo Regresando al path que contiene los otros scripts sh
cd ..
cd ..
cd ..
cd Templates
pwd=$(pwd)
echo $pwd
echo ----------------------------------------------------------------------------------------------------
echo Generador del modulo Service
echo
sh ./generate_service.sh $key_low $key_up $template_path $module_path
echo ----------------------------------------------------------------------------------------------------
echo Generador del modulo Controller
echo


