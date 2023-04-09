import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';

export function useImageParse() {
  /**
   * 组装图片地址
   * @param url 图片地址
   * @returns
   */
  const assembleSource = (url: string | undefined | null) => {
    if (!url) return '';

    const { baseUrlConfig } = storeToRefs(useDashboardStore());
    const { dataValue: baseUrl = '' } = baseUrlConfig.value || {} as any;

    // 兼容带https?协议路径的处理
    if (/^https?:\/\//.test(String(url))) return String(url);

    let newUrl: string | undefined | null = null;

    if (url.indexOf('/') !== 0) {
      newUrl = `/${url}`;
    } else {
      newUrl = url;
    }

    return newUrl ? `${baseUrl}${newUrl}` : '';
  };


  /** 解析 json 数据，并获取第一个值 */
  const parseImageAndGetFirst = (json: string) => {
    try {
      const data = JSON.parse(json);
      if (Array.isArray(data)) {
        return assembleSource(String(data?.[0]?.url));
      } else if (data?.url) {
        return assembleSource(String(data?.url));
      } else {
        return assembleSource(String(data));
      }
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  return {
    /** 组装图片地址 */
    assembleSource,
    /** 解析 json 数据，并获取第一个值 */
    parseImageAndGetFirst,
  };
}
