<template>
  <div class="about">
    <l-map
      :zoom="zoom"
      :center="pointLatLng || defaultCenter"
      style="height: 50vh; width: 100%;"
      @click="addMarker"
      ref="mymap"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="pointLatLng" v-if="pointLatLng"> </l-marker>
    </l-map>
  </div>
</template>
<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import { latLng } from 'leaflet';

@Component({})
export default class PointView extends Vue {
  zoom = 4;

  defaultCenter = latLng(47.41322, -1.219482);

  url = '//osm-tile.descartes.com/osm_tiles/{z}/{x}/{y}.png';

  attribution = 'DSG | Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" class="osm-attrib">OpenStreetMap</a>';

  pointLatLng: L.LatLng | null = null;

  @Prop() lat!: number | null;

  @Prop() lng!: number | null;

  mounted() {
    if (this.lat && this.lng) {
      this.pointLatLng = latLng(this.lat, this.lng);
    }
  }

  addMarker(event: {latlng: L.LatLng}) {
    this.$emit('point-changed', event.latlng);
    this.pointLatLng = event.latlng;
  }

  getMap(): L.Map {
    return (this.$refs.mymap as unknown as {mapObject: L.Map}).mapObject;
  }

  invalidateSize() {
    setTimeout(() => {
      this.getMap().invalidateSize();
    }, 100);
  }
}
</script>
