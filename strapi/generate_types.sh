npm run strapi ts:generate-types --debug
rm -rf ../crint-site/src/utils/generated/
mv types/generated/ ../crint-site/src/utils/
echo "Concluído"
