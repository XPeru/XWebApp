
#!/bin/sh
echo path de ingreso del template
echo "$3"'/template_service.txt'
INPUT=$(<"$3"'/template_service.txt')
echo
echo
OUTPUT="$4"'/'"$1"'Service.js'
echo path del archivo a imprimir
echo "$4"'/'"$1"'Service.js'
# #Reemplazando #patternL# por el keyword en minusculas 
INPUT=`echo $INPUT | sed -e "s/#patternL#/$1/g"`
# #Reemplazando #patternU# por el keyword capitalizado
INPUT=`echo $INPUT | sed -e "s/#patternU#/$2/g"`
echo $INPUT >"$OUTPUT"
echo
echo Archivo service generado