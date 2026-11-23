
import pandas as pd
import folium 
from sklearn.cluster import KMeans
from sklearn.neighbors import KNeighborsClassifier

datos = pd.read_csv("cines_oriente_el_salvador.csv")

# Mostrar los datos
print("DATOS DE LOS CINES:")
print(datos)

# Mostrar información general
print("\nINFORMACIÓN DEL DATASET:")
datos.info()

# Comprobar si existen datos vacíos
print("\nDATOS FALTANTES:")
print(datos.isnull().sum())

print("\nCANTIDAD DE CINES POR MUNICIPIO:")
print(datos["city/municipality"].value_counts())

print("\nESTADISTICAS DE LAS COORDENADAS:")
print(datos[["latitude", "longitude"]].describe())


print("\nDATOS PARA K-MEANS")

X = datos[["latitude", "longitude"]]

print(X)

modelo = KMeans(n_clusters=2, random_state=42, n_init=10)


modelo.fit(X)

datos["cluster"] = modelo.labels_

print("\nRESULTADOS DE K-MEANS:")
print(datos[["name", "city/municipality", "cluster"]])

# Datos para KNN

X_knn = datos[["latitude", "longitude"]]

# municipios como etiquetas
y_knn = datos["city/municipality"]

print("\nDATOS PARA KNN:")
print(X_knn)

print("\nETIQUETAS PARA KNN:")
print(y_knn)

# entrenar modelo


modelo_knn = KNeighborsClassifier(n_neighbors=1)

# Entrenamiento
modelo_knn.fit(X_knn, y_knn)

print("\nMODELO KNN ENTRENADO CORRECTAMENTE.")

# prueba con prediccion

# Coordenadas nuevas
nueva_ubicacion = pd.DataFrame(
    [[13.350000, -88.430000]],
    columns=["latitude", "longitude"]
)


prediccion = modelo_knn.predict(nueva_ubicacion)

print("\nPREDICCION DE KNN:")
print("Municipio estimado:", prediccion[0])

# mapa interactivo con ambos algoritmos

colores = {
    0: "blue",
    1: "orange"
}

# Calcular del mapa
centro_latitud = datos["latitude"].mean()
centro_longitud = datos["longitude"].mean()

mapa = folium.Map(
    location=[centro_latitud, centro_longitud],
    zoom_start=9,
    tiles="OpenStreetMap"
)

for indice, fila in datos.iterrows():

    folium.Marker(
        location=[fila["latitude"], fila["longitude"]],
        popup=f"Nombre: {fila['name']}<br>"
              f"Municipio: {fila['city/municipality']}<br>"
              f"Cluster K-Means: {fila['cluster']}",
        tooltip=fila["name"],
        icon=folium.Icon(
            color=colores[fila["cluster"]]
        )
    ).add_to(mapa)

# Agregar ubicacion de prueba de KNN
folium.Marker(
    location=nueva_ubicacion.iloc[0].tolist(),
    popup=f"Predicción KNN: {prediccion[0]}",
    tooltip="Ubicación de prueba KNN",
    icon=folium.Icon(
        color="purple",
        icon="info-sign"
    )
).add_to(mapa)

# Guardar el mapa
mapa.save("mapa_resultados_ml.html")

print("\nMapa con K-Means y KNN creado correctamente.")