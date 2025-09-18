import React from "react";
import MapView, { Marker } from "react-native-maps";

interface MapProps {
  latitude: number;
  longitude: number;
}

const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function MapComponent({ latitude, longitude }: MapProps) {
  return (
    <MapView
      style={{ flex: 1 }}
      provider="google"
      googleMapId={googleMapsApiKey}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title="Selected Location"
        description="This is the selected place"
      />
    </MapView>
  );
}
