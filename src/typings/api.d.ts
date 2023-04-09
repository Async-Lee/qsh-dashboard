declare namespace QSH {
  /** 会员统计 */
  interface MembershipStatisticsDTO {
    /** 会员总数 */
    totalMember: number;
    /** 本月新增 */
    addedThisMonth: number;
    /** 本月新增环比 */
    addedThisMonthChain: number;
    /** 男性会员 */
    totalMaleMember: number;
    /** 女性会员 */
    totalFemaleMember: number;
  }

  /** 近半年会员增长趋势数据项 */
  interface TrendItemDTO {
    /** 当月会员新增的总数 */
    value: number;
    /** 日期格式为 yy - MM */
    key: string;
  }

  /** 会员地区统计数据项 */
  interface AreaItemDTO {
    /** 会员地区 */
    value: number;
    /** 日期格式为 yy - MM */
    key: string;
  }

  /** 企业位置列表 */
  interface EnterpriseAddressItemDTO {
    /** 企业名称 */
    enterpriseName: string;
    /** 企业地址 */
    detailAddress: string;
    /** 经度 */
    longitude: string;
    /** 纬度 */
    latitude: string;
    /** 省 */
    provinceName: string;
    /** 市 */
    cityName: string;
    /** 区 */
    areaName: string;
    /** 企业log */
    log: string;
  }


  /** 会员企业行业分布数据项 */
  interface DistributionItemDTO {
    /** 行业名称 */
    industryName: string;
    /** 占比率 */
    proportion: number;
  }

  /** 大屏数据展示出参 */
  interface ScreenDisplayReturn {
    /** 会员统计 */
    membershipStatistics: MembershipStatisticsDTO;
    /** 近半年会员增长趋势 */
    trendList: TrendItemDTO[];
    /** 会员地区统计 */
    areaList: AreaItemDTO[];
    /** 企业位置列表 */
    enterpriseAddressList: EnterpriseAddressItemDTO[];
    /** 会员企业行业分布 */
    distributionList: DistributionItemDTO[];
  }

  /** 会员风采展示入参 */
  type MemberListParams = PageRequest;

  /** 会员风采展示数据项出参 */
  interface MemberItemResultDTO {
    /** 会员名称 */
    memberName: string
    /** 职务 */
    job: string
    /** 会员图片 */
    image: string
    /** 企业名称 */
    enterpriseName: string
    /** 企业职位名称 */
    memberJob: string
    /** 排序 */
    sort: string
  }

  /** 会员风采展示数据项返回值 */
  interface MemberItemReturnDTO {
    /** 会员名称 */
    memberName: string
    /** 职务 */
    job: string
    /** 会员图片 */
    image: string
    /** 企业名称 */
    enterpriseName: string
    /** 企业职位名称 */
    memberJob: string
    /** 排序 */
    sort: string
  }

  /** 会员风采展示出参 */
  type MemberListResult = PageResult<MemberItemResultDTO>;

  /** 会员风采展示返回值 */
  type MemberListReturn = PageResult<MemberItemReturnDTO>;
}
