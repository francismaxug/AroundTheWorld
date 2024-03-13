import { useSearchParams } from "react-router-dom";

export function useUrlPosition(){
  const [search] = useSearchParams();
  const mapLat = search.get("lat");
  const mapLng = search.get("lng");
  return [mapLat, mapLng];
}