
#!/bin/sh
echo path de ingreso del template
echo "$4"'/template_service.txt'
INPUT=$(<"$4"'/template_service.txt')
echo
echo
OUTPUT="$5"'/'"$1"'Service.js'
echo path del archivo a imprimir
echo "$5"'/'"$1"'Service.js'
# #Reemplazando #patternL# por el keyword en minusculas 
INPUT=`echo $INPUT | sed -e "s/#patternL#/$1/g"`
# #Reemplazando #patternU# por el keyword capitalizado
INPUT=`echo $INPUT | sed -e "s/#patternU#/$2/g"`

INPUT=`echo $INPUT | sed -e "s/#patternM#/$3/g"`
echo $INPUT >"$OUTPUT"
echo
echo Archivo service generado