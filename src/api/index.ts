import { useImageParse } from '@/hooks/use-image-parse';
import request from '@/request';

/** 基础配置 */
const basicConfigUrl = '/alumniManage/direction/queryConfig'

/** 大屏数据展示 */
const screenDisplayUrl = '/alumni/relevant/large/screenDisplay';

/** 会员风采展示 */
const memberListUrl = '/alumni/relevant/member/styleDisplay';

/** 获取会员风采展示数据 */
export const getBaisicConfig = (params = {
  codes: ['baseUrl'],
}) => {
  return request.post(basicConfigUrl, params).then((res) => res);
};

/** 获取大屏数据展示 */
export const getScreenDisplayData = () => {
  return request.get(screenDisplayUrl).then((res): QSH.ScreenDisplayReturn => res);
};

/** 获取会员风采展示数据 */
export const getMemberList = (params: QSH.MemberListParams) => {
  return request.post(memberListUrl, params).then((res: QSH.MemberListResult): QSH.MemberListReturn => {
    const { parseImageAndGetFirst } = useImageParse();
    const list = (res?.list || []).map((item: QSH.MemberItemResultDTO) => ({
      ...item,
      avatar: parseImageAndGetFirst(item.image),
    }));

    return {
      ...res,
      list,
    };
  });
};
