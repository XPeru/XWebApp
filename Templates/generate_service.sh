#!/bin/sh
temp1=$1
temp2=$2
temp3=$3

ReplaceString(){
	cat $1 | sed "s/#patternL#/$temp1/g" | \
		sed "s/#patternU#/$temp2/g" | sed "s/#patternM#/$temp3/g"  > $2
}

OUTPUT=$4$1'Service.js'
echo path del archivo a imprimir
echo "$4""$1"'Service.js'

ReplaceString "template_service.txt" $OUTPUT

echo
echo Archivo service generado