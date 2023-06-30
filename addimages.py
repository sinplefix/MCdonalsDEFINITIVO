import cx_Oracle


conn = cx_Oracle.connect("inacap_ecommerce/.Inacap.2023..@db20220530152721_high")
# connection = cx_Oracle.connect("inacap_ecommerce/.Inacap.2023..@nombre_de_servicio")


with open("bigmac.png", "rb") as file:
    imagen_data = file.read()

# innecesario ahora ;)


cursor = conn.cursor()
cursor.execute("INSERT INTO MCDONALDS2 VALUES (:id, :nombre,:descripcion,:precio, :imagen)",
               id=1, nombre="bigmac.png",descripcion='Deliciosa hamburguesa con queso fundido',precio =4.99, imagen=imagen_data)
conn.commit()



cursor.close()
conn.close()

print("Imagen insertada correctamente")


