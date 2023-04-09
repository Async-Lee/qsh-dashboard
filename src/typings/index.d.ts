/* eslint-disable @typescript-eslint/triple-slash-reference, spaced-comment */

/// <reference path="./api.d.ts" />

declare namespace QSH {
  /** 接口响应数据，外层包装 */
  interface HttpResult {
    /** 后端返回的响应码 */
    code: string;
    /** 请求是否成功 */
    success: boolean;
    /** 响应信息 */
    message: string;
    /** 响应数据 */
    data: any;
  }

  /** 分页参数 */
  interface PageOptions {
    /** 页码 */
    pageNum: number | 1;
    /** 每页条数 */
    pageSize: number | 10;
    /** 排序字段 */
    orderBy?: string;
    /** 升序/降序 */
    sort?: EnumSort;
  }

  /** 请求参数page */
  interface PageRequest {
    /** 分页配置 */
    page: PageOptions;
  }

  /** 返回的分页数据 */
  interface PageResult<L> {
    /** 当前页码 */
    pageNum: number;
    /** 总数据条数 */
    total: number;
    /** 总页数 */
    totalPage: number;
    /** 列表数据 */
    list: L[];
  }

}