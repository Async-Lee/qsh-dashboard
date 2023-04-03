import { ref } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import ICON_MAP_MAKE from '@image/icon-map-make.png';
import { vw } from '@/utils';

interface IPositoin {
  /** 经度 */
  lng: number;
  /** 纬度 */
  lat: number;
}

interface IEnterpriseInfo extends IPositoin {
  /** 企业名称 */
  enterpriseName: string;
  /** 企业地址 */
  enterpriseAddress: string;
}

export default () => {
  /** 高德地图key */
  const AMAP_KEY = '12dc3309c3ab09f2d21dbecca2b6c047';

  /** 地图实例 */
  const mapInstance = ref();

  const center = { lng: 114.085947, lat: 22.547 };
  const zoom = 11;

  /** 初始化地图 */
  const initAMap = (id: string) => new Promise((resolve, reject) => AMapLoader.load({
    key: AMAP_KEY,
    version: '2.0',
    // plugins: [],
  }).then((AMap) => {
    /** 初始化地图参数 */
    const option: { [key: string]: any } = {
      center: new AMap.LngLat(center.lng, center.lat),
      zoom,
    };

    mapInstance.value = new AMap.Map(id, option);
    mapInstance.value.setDefaultCursor('pointer');
    resolve(true);
  }).catch((error) => {
    console.error(error);  //加载错误提示
    reject(error);
  }))

  let infoWindow: AMap.InfoWindow;

  /** 打开信息窗体 */
  const openInfo = (item: IEnterpriseInfo) => {
    const { lng, lat, enterpriseName, enterpriseAddress } = item;
    const htmlText = `
      <div class="amap-info-window">
        <div class="amap-info-window--enterprise-info name">
          <span class="icon"></span>${enterpriseName}
        </div>
        <div class="amap-info-window--enterprise-info address">
          <span class="icon"></span>${enterpriseAddress}
        </div>
      </div>
    `;

    infoWindow = new AMap.InfoWindow({
      isCustom: true,
      closeWhenClickMap: true,
      anchor: 'bottom-center',
      offset: new AMap.Pixel(0, vw(-44)),
      content: htmlText
    });

    infoWindow.open(mapInstance.value, [lng, lat]);
  };

  /** 设置单个标记 */
  const setSingleMarker = (item: IEnterpriseInfo) => {
    const { lng, lat } = item;
    const marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      anchor: 'bottom-center',
      // icon: ICON_MAP_MAKE,
      icon: new AMap.Icon({
        image: ICON_MAP_MAKE,
        size: new AMap.Size(vw(50), vw(50)),
        imageSize: new AMap.Size(vw(50), vw(50))
      }),
      clickable: true,
    });
    marker.on('click', () => openInfo(item));
    mapInstance.value.add(marker);
  };

  /** 设置标记 */
  const setMarker = (data: IEnterpriseInfo[]) => {
    data.forEach((item) => {
      setSingleMarker(item);
    })
  };

  return {
    /** 初始化地图 */
    initAMap,
    /** 设置标记 */
    setMarker,
    /** 打开信息窗体 */
    openInfo,
  }
}