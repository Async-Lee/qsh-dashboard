import { nextTick, ref } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';
import ICON_MAP_MAKE_NORMAL from '@image/icon-map-make-normal.png';
import ICON_MAP_MAKE_SELECTED from '@image/icon-map-make-selected.png';
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
  /** 默认展示 */
  isDefault?: boolean;
}

export default () => {
  /** 高德地图key */
  const AMAP_KEY = '12dc3309c3ab09f2d21dbecca2b6c047';

  /** 地图实例 */
  const mapInstance = ref();

  const center = { lng: 114.085947, lat: 22.547 };
  const zoom = 10.8;

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
    resolve(true);

    nextTick(() => {
      mapInstance.value.setDefaultCursor('pointer');
      mapInstance.value.setZoom(zoom);
      mapInstance.value.on('click', resetMarkerIcon);
    });
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
      offset: new AMap.Pixel(0, vw(-32)),
      content: htmlText
    });

    infoWindow.open(mapInstance.value, [lng, lat]);
  };

  /** 标记集合 */
  const markers: AMap.Marker[] = [];

  const MARKER_ICON_NORMAL = 'normal';
  const MARKER_ICON_SELECTED = 'selected';

  /** marker icon */
  const getMarkerIcon = (className = MARKER_ICON_NORMAL) => {
    const icon = new AMap.Icon({
      image: className === MARKER_ICON_SELECTED ? ICON_MAP_MAKE_SELECTED : ICON_MAP_MAKE_NORMAL,
      size: new AMap.Size(vw(20), vw(24)),
      imageSize: new AMap.Size(vw(20), vw(24))
    });
    icon.CLASS_NAME = className;
    return icon;
  };

  const onIconClick = (e: any, item: IEnterpriseInfo) => {
    const { target } = e;
    const targetIcon = target?.getIcon();
    if (targetIcon.CLASS_NAME !== MARKER_ICON_SELECTED) {
      markers.forEach((marker) => {
        const icon = marker.getIcon();
        if (typeof icon !== 'string' && icon?.CLASS_NAME === MARKER_ICON_SELECTED) {
          marker.setIcon(getMarkerIcon());
        }
      });
      target.setIcon(getMarkerIcon(MARKER_ICON_SELECTED));
    }
    openInfo(item);
  }

  /** 设置单个标记 */
  const setSingleMarker = (item: IEnterpriseInfo) => {
    const { lng, lat, isDefault = false } = item;
    const marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      anchor: 'bottom-center',
      icon: getMarkerIcon(isDefault ? MARKER_ICON_SELECTED : MARKER_ICON_NORMAL),
      clickable: true,
    });
    marker.on('click', (e) => onIconClick(e, item));

    if (isDefault) {
      openInfo(item);
    }

    markers.push(marker);
    mapInstance.value.add(marker);
  };

  /** 重置标记icon */
  const resetMarkerIcon = () => {
    markers.forEach((marker) => {
      const icon = marker.getIcon();
      if (typeof icon !== 'string' && icon?.CLASS_NAME === MARKER_ICON_SELECTED) {
        marker.setIcon(getMarkerIcon());
      }
    });
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