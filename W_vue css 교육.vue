<template>

    <div class="wrap">
        <!-- header -->
        <header class="header">
            <div class="header_main_wrap">
                <div class="header_main">
                    <h1 class="main_logo"><a href="#"><img src="/src/assets/images/wts/common/img_logo.png" alt="KCX"></a></h1>
                    <!-- 로그인 전 -->
                    <div class="signin_btns">
                        <span><button type="button">로그인</button></span>
                        <span class="last"><button type="button">회원가입</button></span>
                    </div>
                    <!-- //로그인 전 -->
                    <!-- 로그인 후 -->
                    <div class="signin_btns" style="display:none">
                        <span class="first"><button type="button">로그아웃</button></span>
                    </div>
                    <!-- //로그인 후 -->
                </div>
                <!-- gnb -->
                <nav class="gnb" v-bind:class="[gnb_height == true ? 'depth_open' : '' ]">
                    <ul>
                        <li><a href="#">거래소</a></li>
                        <li><a href="#">KCX소식</a></li>
                        <li><a href="#">내지갑</a></li>
                        <li><a href="#">입출금</a></li>
                        <li @mouseleave="depth_close();">
                            <a href="#" class="depth_tit" @mouseover="depth_toggle($event);" v-bind:class="{on : gnb_height}">나의KCX</a>
                            <ul class="depth" v-if="depth_layer" @mouseleave="depth_close();">
                                <li><a href="#">회원정보</a></li>
                                <li><a href="#">주소록</a></li>
                                <li><a href="#">접속관리</a></li>
                                <li><a href="#">안내 및 문의</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <!-- //gnb -->
            </div>
            <div class="header_util_wrap">
                <div class="header_util_area">
                    <div class="srch_zone">
                        <input type="text" name="" id="" placeholder="종목명과 심볼로 검색하세요." @click="this.coinSrchLayer = true">
                        <button type="button" class="btn_clear on" @click="inpClear($event)"><span class="blind">삭제</span></button>
                        <!-- 종목검색 레이어 -->
                        <div class="srch_result_layer" v-if="coinSrchLayer">
                            <div class="top_btns_zone">
                                <div class="tooltip set_layer_wrap">
                                    <div class="tooltip_wrap">
                                        <button type="button" class="btn_setting" @click="this.setLayer = true"><span class="blind">설정</span></button>
                                        <div class="tip_cnt_box" v-if="setLayer">
                                            <dl>
                                                <dt>가격 표시</dt>
                                                <dd>
                                                    <dl class="price_set_cnt">
                                                        <dd class="pd_t0">
                                                            <ul>
                                                                <li>
                                                                    <div class="txt">
                                                                        <p>대비노출</p>
                                                                        <span>전일 대비 등락 가격 표시</span>
                                                                    </div>
                                                                    <span class="radio-type3">
                                                                        <input type="checkbox" id="chk_btc_show" checked="checked"><label for="chk_btc_show"></label>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <div class="txt">
                                                                        <p>KRW환산</p>
                                                                        <span>거래대금 KRW 환산 가격 표시</span>
                                                                    </div>
                                                                    <span class="radio-type3">
                                                                        <input type="checkbox" id="chk_krw_show"><label for="chk_krw_show"></label>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </dd>
                                                    </dl>
                                                </dd>
                                            </dl>
                                            <button type="button" class="btn_close_tip" @click="this.setLayer = false"><span class="blind">닫기</span></button>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn_layer_close" @click="this.coinSrchLayer = false"><span class="blind">닫기</span></button>
                            </div>
                            <div class="tab_depth">
                                <ul class="tab_menu_area">
                                    <li @click="tabMenu(0)" :class="{on:currentTab==0}"><button type="button">KRW</button></li>
                                    <li @click="tabMenu(1)" :class="{on:currentTab==1}"><button type="button">BTC</button></li>
                                    <li @click="tabMenu(2)" :class="{on:currentTab==2}"><button type="button">보유</button></li>
                                    <li @click="tabMenu(3)" :class="{on:currentTab==3}"><button type="button">관심</button></li>
                                </ul>
                                <div class="tab_cnt_area" v-if="currentTab==0">
                                    <div class="fv_layer_wrap">
                                        <Scroll class="tbl_stock_list y_scroll_zone">
                                            <table>
                                                <caption class="blind">거래소 현황</caption>
                                                <colgroup>
                                                    <col>
                                                    <col style="width:25%;">
                                                    <col style="width:20%">
                                                    <col style="width:25%;">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">종목명</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">현재가</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">등락(대비)</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">거래대금</button></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">GHX/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">종목명은열두자까지입니다</p>
                                                                    <p class="unit">BTC/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p><div class="box_wrap">99,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p>0%<span>0</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">GHX/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트코인</span></p><!-- 검색한 키워드한 일치하는 텍스트를 <span class="txt_keyword">를 감싸주세요 -->
                                                                    <p class="unit"><span class="txt_keyword">BTC</span>/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">GHX/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down active"><div class="box_wrap">999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">GHX/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up active"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">GHX/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">GHX/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite on" @click="this.layerFv2 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Scroll>
                                        <!-- 관심종목편집 레이어 -->
                                        <div class="fv_layer" v-if="layerFv2">
                                            <dl>
                                                <dt class="fv_title">관심 종목 편집</dt>
                                                <dd class="fv_cnts">
                                                    <p class="unit">BTC/KRW</p>
                                                    <p class="total_counter"><strong>2</strong>그룹 내 총 <strong>34</strong>건 등록</p>
                                                    <Scroll class="list_fv_chk">
                                                        <ul>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_1">
                                                                    <label for="ct-1_1">관심종목1</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_2">
                                                                    <label for="ct-1_2">관심종목2</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_3">
                                                                    <label for="ct-1_3">관심종목3</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_4">
                                                                    <label for="ct-1_4">관심종목4</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_5">
                                                                    <label for="ct-1_5">관심종목5</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_6">
                                                                    <label for="ct-1_6">관심종목6</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_7">
                                                                    <label for="ct-1_7">관심종목7</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_8">
                                                                    <label for="ct-1_8">관심종목8</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_9">
                                                                    <label for="ct-1_9">관심종목9</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                        </ul>
                                                    </Scroll>
                                                </dd>
                                                <dd class="fv_btn_area">
                                                    <button type="button" class="btn l gray" @click="this.layerFv2 = false"><span>취소</span></button>
                                                    <button type="button" class="btn l dblue" @click="this.layerFv2 = false"><span>저장</span></button>
                                                </dd>
                                            </dl>
                                        </div>
                                        <!-- //관심종목편집 레이어 -->
                                    </div>
                                </div>
                                <div class="tab_cnt_area" v-else-if="currentTab==1">
                                    <div class="fv_layer_wrap">
                                        <Scroll class="tbl_stock_list y_scroll_zone">
                                            <table>
                                                <caption class="blind">거래소 현황</caption>
                                                <colgroup>
                                                    <col>
                                                    <col style="width:25%;">
                                                    <col style="width:20%">
                                                    <col style="width:25%;">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">종목명</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">현재가</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">등락(대비)</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">거래대금</button></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up active">
                                                                <div class="box_wrap">999,999,999<span class="txt_sub">999,999 KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p>
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>0%<span>0</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down active">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv3 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Scroll>
                                        <!-- 관심종목편집 레이어 -->
                                        <div class="fv_layer" v-if="layerFv3">
                                            <dl>
                                                <dt class="fv_title">관심 종목 편집</dt>
                                                <dd class="fv_cnts">
                                                    <p class="unit">BTC/KRW</p>
                                                    <p class="total_counter"><strong>2</strong>그룹 내 총 <strong>34</strong>건 등록</p>
                                                    <Scroll class="list_fv_chk">
                                                        <ul>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_1">
                                                                    <label for="ct-1_1">관심종목1</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_2">
                                                                    <label for="ct-1_2">관심종목2</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_3">
                                                                    <label for="ct-1_3">관심종목3</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_4">
                                                                    <label for="ct-1_4">관심종목4</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_5">
                                                                    <label for="ct-1_5">관심종목5</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_6">
                                                                    <label for="ct-1_6">관심종목6</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_7">
                                                                    <label for="ct-1_7">관심종목7</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_8">
                                                                    <label for="ct-1_8">관심종목8</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_9">
                                                                    <label for="ct-1_9">관심종목9</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                        </ul>
                                                    </Scroll>
                                                </dd>
                                                <dd class="fv_btn_area">
                                                    <button type="button" class="btn l gray" @click="this.layerFv3 = false"><span>취소</span></button>
                                                    <button type="button" class="btn l dblue" @click="this.layerFv3 = false"><span>저장</span></button>
                                                </dd>
                                            </dl>
                                        </div>
                                        <!-- //관심종목편집 레이어 -->
                                    </div>
                                </div>
                                <div class="tab_cnt_area" v-else-if="currentTab==2">
                                    <!-- 보유내역 -->
                                    <div class="my_stock_account fv_layer_wrap">
                                        <Scroll class="tbl_stock_list y_scroll_zone mine">
                                            <table>
                                                <caption class="blind">거래소 현황</caption>
                                                <colgroup>
                                                    <col>
                                                    <col style="width:25%;">
                                                    <col style="width:20%">
                                                    <col style="width:25%;">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">종목명</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">현재가</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">등락(대비)</button></th>
                                                        <th scope="col"><button type="button" class="btn_sort" @click="sorting($event)">거래대금</button></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up active">
                                                                <div class="box_wrap">999,999,999<span class="txt_sub">999,999 KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p>
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p>0%<span>0</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit">웨이브</p>
                                                                    <p class="unit">BTC/KRW</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_down active">
                                                                <div class="box_wrap">999,999,999,999</div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="coin_tit_wrap">
                                                                <button type="button" class="btn_favorite" @click="this.layerFv4 = true"><span class="blind">즐겨찾기</span></button>
                                                                <div class="graph" style="background:#ddd"></div>
                                                                <a href="#" class="txt">
                                                                    <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                    <p class="unit">BTC/BTC</p>
                                                                </a>
                                                            </div>
                                                        </td>
                                                        <td class="price">
                                                            <p class="txt_up">
                                                                <div class="box_wrap">999,999,999,999<span class="txt_sub">99,999,999KRW</span></div>
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p class="txt_up">+999.99%<span>+99,999,999,999</span></p>
                                                        </td>
                                                        <td>
                                                            <p>999,999,999,999<span class="txt_sub">999,999백만</span></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Scroll>
                                        <div class="layer_total_account" v-bind:class="[isActive ? '' : 'on']">
                                            <input type="button" class="btn_toggle" @click="toggleClass()">
                                            <ul>
                                                <li>
                                                    <p class="tit">총매수</p>
                                                    <p class="txt">99,999,999,999 KRW</p>
                                                </li>
                                                <li>
                                                    <p class="tit">총평가</p>
                                                    <p class="txt">99,999,999,999 KRW</p>
                                                </li>
                                                <li>
                                                    <p class="tit">평가손익</p>
                                                    <p class="txt txt_up">+99,999,999,999 KRW</p><!-- 이익 .txt_up / 손실 .txt_down -->
                                                </li>
                                                <li>
                                                    <p class="tit">수익률</p>
                                                    <p class="txt txt_up">+9,999,99%</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 관심종목편집 레이어 -->
                                        <div class="fv_layer" v-if="layerFv4">
                                            <dl>
                                                <dt class="fv_title">관심 종목 편집</dt>
                                                <dd class="fv_cnts">
                                                    <p class="unit">BTC/KRW</p>
                                                    <p class="total_counter"><strong>2</strong>그룹 내 총 <strong>34</strong>건 등록</p>
                                                    <Scroll class="list_fv_chk">
                                                        <ul>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_1">
                                                                    <label for="ct-1_1">관심종목1</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_2">
                                                                    <label for="ct-1_2">관심종목2</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_3">
                                                                    <label for="ct-1_3">관심종목3</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_4">
                                                                    <label for="ct-1_4">관심종목4</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_5">
                                                                    <label for="ct-1_5">관심종목5</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_6">
                                                                    <label for="ct-1_6">관심종목6</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_7">
                                                                    <label for="ct-1_7">관심종목7</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_8">
                                                                    <label for="ct-1_8">관심종목8</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                            <li>
                                                                <span class="check-type1">
                                                                    <input type="checkbox" id="ct-1_9">
                                                                    <label for="ct-1_9">관심종목9</label>
                                                                </span>
                                                                <span class="num">(3)</span>
                                                            </li>
                                                        </ul>
                                                    </Scroll>
                                                </dd>
                                                <dd class="fv_btn_area">
                                                    <button type="button" class="btn l gray" @click="this.layerFv4 = false"><span>취소</span></button>
                                                    <button type="button" class="btn l dblue" @click="this.layerFv4 = false"><span>저장</span></button>
                                                </dd>
                                            </dl>
                                        </div>
                                        <!-- //관심종목편집 레이어 -->
                                    </div>
                                    <!-- //보유내역 -->
                                    <!-- 로그인 전 -->
                                    <div class="my_stock_account" style="display:none;">
                                        <div class="before_member_cnt">
                                            <p class="txt">로그인 후 보유 종목을 확인할 수 있습니다.</p>
                                            <div class="btn_area"><button type="button" class="btn l gray btn_login"><span>로그인</span></button></div>
                                        </div>
                                    </div>
                                    <!-- //로그인 전 -->
                                    <!-- 고객확인 전 -->
                                    <div class="my_stock_account" style="display:none;">
                                        <div class="before_confirm_cnt">
                                            <p class="txt">KCX는 안전한 디지털 자산 거래를 위해<br>고객확인 절차를 시행하고 있습니다.<br>KCX모바일 앱에서 고객확인 후 거래가 가능합니다.</p>
                                            <div class="app_intro_area">
                                                <div class="top_side">
                                                    <div class="qrcode_box"><img src="/src/assets/images/wts/common/qr_addr.png" alt="qr코드"></div>
                                                    <p class="tit">KCX앱 다운로드</p>
                                                </div>
                                                <div class="btm_side">
                                                    <div class="ico_app"><img src="/src/assets/images/wts/common/img_app_kcx02.png" alt="KCX 거래소 앱"></div>
                                                    <dl>
                                                        <dt>KCX 거래소 앱 다운로드</dt>
                                                        <dd>
                                                            <button type="button" class="btn s lgray"><span class="g">Google play</span></button>
                                                            <button type="button" class="btn s lgray"><span class="a">App Store</span></button>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- //고객확인 전 -->
                                    <!-- 보유종목 없을 경우 -->
                                    <div class="my_stock_account" style="display:none;">
                                        <div class="before_member_cnt">
                                            <p class="txt_none">보유 종목이 없습니다.</p>
                                        </div>
                                    </div>
                                    <!-- //보유종목 없을 경우 -->
                                </div>
                                <div class="tab_cnt_area" v-else>
                                    <!-- 관심종목 내역 -->
                                    <div class="my_stock_account">
                                        <div class="my_stock_alignment">
                                            <select name="" id="">
                                                <option value="">관심종목1</option>
                                                <option value="">관심종목2</option>
                                            </select>
                                        </div>
                                        <div class="fv_layer_wrap">
                                            <Scroll class="tbl_stock_list y_scroll_zone favorite">
                                                <table>
                                                    <caption class="blind">거래소 현황</caption>
                                                    <colgroup>
                                                        <col>
                                                        <col style="width:25%;">
                                                        <col style="width:20%">
                                                        <col style="width:25%;">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">종목명</th>
                                                            <th scope="col">현재가</th>
                                                            <th scope="col">등락(대비)</th>
                                                            <th scope="col">거래대금</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="4" class="group_title">키움이 고민중</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit">웨이브</p>
                                                                        <p class="unit">GHX/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_down">-999.99%<span>-99,999,999,999</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit">종목명은열두자까지입니다</p>
                                                                        <p class="unit">BTC/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p><div class="box_wrap">99,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p>0%<span>0</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit">웨이브</p>
                                                                        <p class="unit">GHX/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                        <p class="unit">BTC/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="4" class="group_title">키움이가 찜한 거래소</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit">웨이브</p>
                                                                        <p class="unit">GHX/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                        <p class="unit">BTC/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                        <p class="unit">BTC/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit">웨이브</p>
                                                                        <p class="unit">GHX/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_down"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_down">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                        <p class="unit">BTC/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div class="coin_tit_wrap">
                                                                    <button type="button" class="btn_favorite on" @click="this.layerFv = true"><span class="blind">즐겨찾기</span></button>
                                                                    <div class="graph" style="background:#ddd"></div>
                                                                    <a href="#" class="txt">
                                                                        <p class="tit"><span class="txt_keyword">비트</span>코인</p>
                                                                        <p class="unit">BTC/KRW</p>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td class="price">
                                                                <p class="txt_up"><div class="box_wrap">999,999,999,999</div></p>
                                                            </td>
                                                            <td>
                                                                <p class="txt_up">-4.34%<span>-2,287,000</span></p>
                                                            </td>
                                                            <td>
                                                                <p>999,999,999,999</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Scroll>
                                            <!-- 관심종목편집 레이어 -->
                                            <div class="fv_layer" v-if="layerFv">
                                                <dl>
                                                    <dt class="fv_title">관심 종목 편집</dt>
                                                    <dd class="fv_cnts">
                                                        <p class="unit">BTC/KRW</p>
                                                        <p class="total_counter"><strong>2</strong>그룹 내 총 <strong>34</strong>건 등록</p>
                                                        <Scroll class="list_fv_chk">
                                                            <ul>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_1">
                                                                        <label for="ct-1_1">관심종목1</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_2">
                                                                        <label for="ct-1_2">관심종목2</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_3">
                                                                        <label for="ct-1_3">관심종목3</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_4">
                                                                        <label for="ct-1_4">관심종목4</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_5">
                                                                        <label for="ct-1_5">관심종목5</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_6">
                                                                        <label for="ct-1_6">관심종목6</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_7">
                                                                        <label for="ct-1_7">관심종목7</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_8">
                                                                        <label for="ct-1_8">관심종목8</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                                <li>
                                                                    <span class="check-type1">
                                                                        <input type="checkbox" id="ct-1_9">
                                                                        <label for="ct-1_9">관심종목9</label>
                                                                    </span>
                                                                    <span class="num">(3)</span>
                                                                </li>
                                                            </ul>
                                                        </Scroll>
                                                    </dd>
                                                    <dd class="fv_btn_area">
                                                        <button type="button" class="btn l gray" @click="this.layerFv = false"><span>취소</span></button>
                                                        <button type="button" class="btn l dblue" @click="this.layerFv = false"><span>저장</span></button>
                                                    </dd>
                                                </dl>
                                            </div>
                                            <!-- //관심종목편집 레이어 -->
                                        </div>
                                    </div>
                                    <!-- //관심종목 내역 -->
                                    <!-- 로그인 전 -->
                                    <div class="my_stock_account" style="display:none;">
                                        <div class="before_member_cnt">
                                            <p class="txt">로그인 후 관심 종목을 확인할 수 있습니다.</p>
                                            <div class="btn_area"><button type="button" class="btn l gray btn_login"><span>로그인</span></button></div>
                                        </div>
                                    </div>
                                    <!-- //로그인 전 -->
                                    <!-- 관심종목 없을 경우 -->
                                    <div class="my_stock_account" style="display:none;">
                                        <div class="before_member_cnt">
                                            <p class="txt_none">관심 종목이 없습니다.</p>
                                        </div>
                                    </div>
                                    <!-- //관심종목 없을 경우 -->
                                </div>
                            </div>
                        </div>
                        <!-- //종목검색 레이어 -->
                    </div>
                    <!-- s : 2022.10.11 실시간 순위 삭제
                    <div class="ranking_zone" v-bind:class="[layerShow ? '' : 'open']">
                        <button type="button" class="realtime_rank_area" @click="rank_layer()">
                            <swiper class="swiper_wrap"
                                @swiper="headerSw"
                                v-bind="swiperOption"
                                :autoplay='{"delay": 3000, "disableOnInteraction": false}'
                            >
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">1</i>
                                        <p class="tit"><span>비트코인비트코인비트코인</span><em>BTC/KRW</em></p>
                                        <p class="price up">999,999,999,999</p>
                                        <p class="percent up">+999.99%</p>
                                        <p class="fluctuation up"><span>999,999,999,999</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">2</i>
                                        <p class="tit"><span>비트코인</span><em>BTC/KRW</em></p>
                                        <p class="price up">999,999,999</p>
                                        <p class="percent up">+99%</p>
                                        <p class="fluctuation up"><span>999,999</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">3</i>
                                        <p class="tit"><span>플로우</span><em>FWC/KRW</em></p>
                                        <p class="price down">9,999</p>
                                        <p class="percent down">-9%</p>
                                        <p class="fluctuation down"><span>99</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">4</i>
                                        <p class="tit"><span>웨이브</span><em>WVC/KRW</em></p>
                                        <p class="price">99,999</p>
                                        <p class="percent">0%</p>
                                        <p class="fluctuation"><span>0</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">5</i>
                                        <p class="tit"><span>비트코인비트코인비트코인</span><em>BTC/KRW</em></p>
                                        <p class="price up">999,999,999,999</p>
                                        <p class="percent up">+999.99%</p>
                                        <p class="fluctuation up"><span>999,999,999,999</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">6</i>
                                        <p class="tit"><span>비트코인</span><em>BTC/KRW</em></p>
                                        <p class="price up">999,999,999</p>
                                        <p class="percent up">+99%</p>
                                        <p class="fluctuation up"><span>999,999</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">7</i>
                                        <p class="tit"><span>플로우</span><em>FWC/KRW</em></p>
                                        <p class="price down">9,999</p>
                                        <p class="percent down">-9%</p>
                                        <p class="fluctuation down"><span>99</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">8</i>
                                        <p class="tit"><span>웨이브</span><em>WVC/KRW</em></p>
                                        <p class="price">99,999</p>
                                        <p class="percent">0%</p>
                                        <p class="fluctuation"><span>0</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">9</i>
                                        <p class="tit"><span>플로우</span><em>FWC/KRW</em></p>
                                        <p class="price down">9,999</p>
                                        <p class="percent down">-9%</p>
                                        <p class="fluctuation down"><span>99</span></p>
                                    </div>
                                </swiper-slide>
                                <swiper-slide class="swiper_item">
                                    <div class="cnt_wrap">
                                        <i class="num">10</i>
                                        <p class="tit"><span>웨이브</span><em>WVC/KRW</em></p>
                                        <p class="price">99,999</p>
                                        <p class="percent">0%</p>
                                        <p class="fluctuation"><span>0</span></p>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </button>
                        <#!-- 실시간 순위 레이어 --#>
                        <div class="rank_detail_layer">
                            <div class="rank_detail">
                                <div class="tit_area">
                                    <p class="tit">실시간 조회 순위</p>
                                    <div class="time_ctrl">
                                        <span class="count_txt">55초 남음</span>
                                        <span class="time_txt">09:00:00</span>
                                        <input type="button" class="btn_reset_time">
                                    </div>
                                </div>
                                <div class="tab_mini">
                                    <ul class="tab_menu_area">
                                        <li class="on"><button type="button">30초</button></li>
                                        <li><button type="button">1분</button></li>
                                        <li><button type="button">10분</button></li>
                                        <li><button type="button">60분</button></li>
                                        <li><button type="button">당일</button></li>
                                    </ul>
                                </div>
                                <Scroll class="popular_rank_list">
                                    <ol>
                                        <li class="up">
                                            <div class="num"><strong>1</strong><p><span>999</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>비트코인비트코인</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="num"><strong>2</strong><p><span>-</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>스테이터스네트워크토큰</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li class="down">
                                            <div class="num"><strong>3</strong><p><span>2</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>이더리움</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">-999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li class="up">
                                            <div class="num"><strong>4</strong><p><span>2</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>비트코인비트코인</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="num"><strong>5</strong><p><span>-</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>스테이터스네트워크토큰</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li class="down">
                                            <div class="num"><strong>6</strong><p><span>2</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>이더리움</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li class="up">
                                            <div class="num"><strong>7</strong><p><span>2</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>비트코인비트코인</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="num"><strong>8</strong><p><span>-</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>스테이터스네트워크토큰</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li class="down">
                                            <div class="num"><strong>9</strong><p><span>2</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>이더리움</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                        <li class="down">
                                            <div class="num"><strong>10</strong><p><span>2</span></p></div>
                                            <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                            <div class="tit"><p>이더리움</p><span>BTC/KRW</span></div>
                                            <div class="price">
                                                <p>999,999,999,999 KRW</p>
                                                <p class="sub_txt">+999.99%<span class="fluctuation">999,999,999,999KRW</span></p>
                                            </div>
                                        </li>
                                    </ol>
                                </Scroll>
                            </div>
                        </div>
                        <#!-- //실시간 순위 레이어 --#>
                    </div>
                    //e : 2022.10.11 실시간 순위 삭제 -->
                    <!-- 거래소 화면에서만 노출 -->
                    <div class="srch_zone2">
                        <button type="button" class="btn_util call_ord">호가주문</button>
                        <button type="button" class="btn_util call_chart">차트</button>
                        <span class="btn_theme">
                            <input type="checkbox" name="" id="chk_theme_dm"><label for="chk_theme_dm" class="chk_theme"><span>테마설정</span></label>
                        </span>
                        <!-- //거래소 화면에서만 노출 -->
                    </div>
                </div>
            </div>
        </header>
        <!-- //header -->
        <!-- container -->
        <section class="container home">
            <div class="home_cnt_wrap">
                <div class="cnt_group">
                    <div class="main_bnr_wrap">
                        <swiper
                            @swiper="swVisual"
                            v-bind="swOption"
                            :autoplay="{delay: 3000, disableOnInteraction: false}"
                            :navigation="true"
                            :pagination="{clickable: true}"
                        >
                            <swiper-slide>
                                <a href="#">
                                    <img src="/src/assets/images/wts/common/img_mainvisual01.png" alt="kcx 가입하기" class="img_light">
                                    <img src="/src/assets/images/wts/common/img_mainvisual01.png" alt="kcx 가입하기" class="img_dm">
                                </a>
                            </swiper-slide>
                            <swiper-slide>
                                <a href="#">
                                    <img src="/src/assets/images/wts/common/img_mainvisual01.png" alt="kcx 가입하기" class="img_light">
                                    <img src="/src/assets/images/wts/common/img_mainvisual01.png" alt="kcx 가입하기" class="img_dm">
                                </a>
                            </swiper-slide>
                            <swiper-slide>
                                <a href="#">
                                    <img src="/src/assets/images/wts/common/img_mainvisual01.png" alt="kcx 가입하기" class="img_light">
                                    <img src="/src/assets/images/wts/common/img_mainvisual01.png" alt="kcx 가입하기" class="img_dm">
                                </a>
                            </swiper-slide>
                        </swiper>
                        <button type="button" class="btn_play_ctrl"><span class="blind">재생/정지</span></button><!-- 재생버튼 모양 .play 추가 -->
                    </div>
                    <div class="main_applink_wrap">
                        <div class="mo_kcx">
                            <p class="tit"><span>24시간 어디서나 편리한</span>코인거래 모바일 앱 KCX</p>
                            <input type="button" value="Google Play" class="btn_link">
                            <input type="button" value="App Store" class="btn_link">
                        </div>
                        <div class="pc_kcx">
                            <p class="tit"><span>PC 거래를 위한</span>트레이딩 설치</p>
                            <input type="button" value="HTS 다운로드" class="btn_link">
                        </div>
                    </div>
                </div>
            </div>
            <div class="home_cnt_wrap">
                <div class="cnt_group">
                    <div class="issue_coin_area">
                        <div class="home_tit_area">
                            <p>주요종목</p>
                            <span class="sort_exchange">
                                <input type="checkbox" name="" id="chk_exchange"><label for="chk_exchange"><span class="blind">거래소 선택</span></label>
                            </span>
                        </div>
                        <div class="issue_coin_cnt">
                            <div class="title_zone up"><!-- 상승 .up / 하락 .down -->
                                <div class="tit_txt">비트코인<span>BTC/KRW</span></div>
                                <div class="price_txt">503,717,000,000 KRW</div>
                                <div class="per_txt">+99.99%<span>999,999,999,999</span></div>
                            </div>
                            <div class="chart_zone" style="background:#eee;">차트영역(사이즈 : 400*160)</div>
                            <div class="issue_swiper_zone">
                                <swiper
                                    @swiper="swIssue"
                                    v-bind="issueOption"
                                    :autoplay="{delay: 3000, disableOnInteraction: false}"
                                    :navigation="true"
                                >
                                    <swiper-slide>
                                        <div class="coin_wrap up">
                                            <p class="tit">비트코인</p>
                                            <p class="price">999,999,999,999</p>
                                            <p class="per">+999.99%</p>
                                            <div class="img_chart" style="background:#eee;">차트영역(사이즈 : 100%*40px)</div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide>
                                        <div class="coin_wrap up">
                                            <p class="tit">비트코인</p>
                                            <p class="price">999,999,999,999</p>
                                            <p class="per">+999.99%</p>
                                            <div class="img_chart" style="background:#eee;">차트영역(사이즈 : 100%*40px)</div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide>
                                        <div class="coin_wrap">
                                            <p class="tit">비트코인</p>
                                            <p class="price">999,999,999,999</p>
                                            <p class="per">+999.99%</p>
                                            <div class="img_chart" style="background:#eee;">차트영역(사이즈 : 100%*40px)</div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide>
                                        <div class="coin_wrap down">
                                            <p class="tit">비트코인</p>
                                            <p class="price">999,999,999,999</p>
                                            <p class="per">+999.99%</p>
                                            <div class="img_chart" style="background:#eee;">차트영역(사이즈 : 100%*40px)</div>
                                        </div>
                                    </swiper-slide>
                                    <swiper-slide>
                                        <div class="coin_wrap down">
                                            <p class="tit">비트코인</p>
                                            <p class="price">999,999,999,999</p>
                                            <p class="per">+999.99%</p>
                                            <div class="img_chart" style="background:#eee;">차트영역(사이즈 : 100%*40px)</div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cnt_group mg_t20">
                    <div class="wrap_board_home">
                        <div class="tab_depth">
                            <ul class="tab_menu_area fix">
                                <li @click="tabMenuHome(0)" :class="{on:homeTab==0}"><button type="button">KCX뉴스</button></li>
                                <li @click="tabMenuHome(1)" :class="{on:homeTab==1}"><button type="button">FAQ</button></li>
                            </ul>
                            <div class="tab_cnt_area" v-if="homeTab==0">
                                <Scroll class="scroll_zone">
                                    <ul>
                                        <li><a href="#">재닛 옐런 미 재무장관 "스테이블 코인의 시장 규모가 기존에 영스테이블 코인의 시장 규모가 기존에 영</a></li>
                                        <li><a href="#">재닛 옐런 미 재무장관 "스테이블 코인의 시장 규모가 기존에 영</a></li>
                                        <li><a href="#">재닛 옐런 미 재무장관 "스테이블 코인의 시장 규모가 기존에 영</a></li>
                                        <li><a href="#">재닛 옐런 미 재무장관 "스테이블 코인의 시장 규모가 기존에 영</a></li>
                                        <li><a href="#">재닛 옐런 미 재무장관 "스테이블 코인의 시장 규모가 기존에 영</a></li>
                                    </ul>
                                </Scroll>
                                <a href="#" class="btn_more"><span class="blind">더보기</span></a>
                            </div>
                            <div class="tab_cnt_area" v-else>
                                <Scroll class="scroll_zone">
                                    <ul>
                                        <li><a href="#">트래블룰 정책만 통과되면 바로 출금이 가능한가요?</a></li>
                                        <li><a href="#">고객확인 의무 안내(본인인증)</a></li>
                                        <li><a href="#">회원가입 시 인증 이메일이 안와요.</a></li>
                                        <li><a href="#">거래 수수료는 얼마인가요?</a></li>
                                        <li><a href="#">가상자산 입금 시 주의사항</a></li>
                                    </ul>
                                </Scroll>
                                <a href="#" class="btn_more"><span class="blind">더보기</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home_cnt_wrap">
                <div class="cnt_group">
                    <div class="intro_kcx">
                        <dl>
                            <dt>가상화폐</dt>
                            <dd>가상화폐 거래소 KCX<br>편리하고 안전한</dd>
                        </dl>
                    </div>
                </div>
                <div class="cnt_group mg_t20">
                    <div class="wrap_ranking_home">
                        <div class="home_tit_area">
                            <p>상승률 랭킹<span class="date">(10.01~10.07)</span></p>
                            <span class="sort_exchange">
                                <input type="checkbox" name="" id="chk_exchange"><label for="chk_exchange"><span class="blind">거래소 선택</span></label>
                            </span>
                        </div>
                        <ul class="list_ranking_home">
                            <li class="up">
                                <div class="top_side">
                                    <div class="num"><strong>1</strong><p><span>999</span></p></div>
                                    <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                    <div class="tit"><p>비트코인비트코인</p><span>BTC/KRW</span></div>
                                </div>
                                <div class="btm_side"><p class="fluctuate_rate">1,199.99%</p><p class="price">999,999,999,999</p><p class="per">+999.99%</p></div>
                            </li>
                            <li>
                                <div class="top_side">
                                    <div class="num"><strong>2</strong><p><span>-</span></p></div>
                                    <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                    <div class="tit"><p>스테이터스네트워크토큰</p><span>BTC/KRW</span></div>
                                </div>
                                <div class="btm_side"><p class="fluctuate_rate">1,199.99%</p><p class="price">999,999,999,999</p><p class="per">+999.99%</p></div>
                            </li>
                            <li class="down">
                                <div class="top_side">
                                    <div class="num"><strong>3</strong><p><span>2</span></p></div>
                                    <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                    <div class="tit"><p>이더리움</p><span>BTC/KRW</span></div>
                                </div>
                                <div class="btm_side"><p class="fluctuate_rate">1,199.99%</p><p class="price">999,999,999,999</p><p class="per">-999.99%</p></div>
                            </li>
                            <li>
                                <div class="top_side">
                                    <div class="num"><strong>4</strong><p><span>-</span></p></div>
                                    <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                    <div class="tit"><p>스테이터스네트워크토큰</p><span>BTC/KRW</span></div>
                                </div>
                                <div class="btm_side"><p class="fluctuate_rate">1,199.99%</p><p class="price">999,999,999,999</p><p class="per">+999.99%</p></div>
                            </li>
                            <li class="down">
                                <div class="top_side">
                                    <div class="num"><strong>5</strong><p><span>2</span></p></div>
                                    <i class="circle_logo32"><img src="/src/assets/images/wts/icon/icon_logo_coin_16.png" alt="로고이미지"></i>
                                    <div class="tit"><p>이더리움</p><span>BTC/KRW</span></div>
                                </div>
                                <div class="btm_side"><p class="fluctuate_rate">1,199.99%</p><p class="price">999,999,999,999</p><p class="per">-999.99%</p></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- //container -->
        <!-- footer -->
        <footer class="footer">
            <div class="footer_wrap">
                <div class="foot_top_side">
                    <h1 class="foot_logo"><a href="#"><img src="/src/assets/images/wts/common/img_footer_logo.png" alt="KCX"></a></h1>
                    <dl class="foot_util">
                        <dt>KCX정보</dt>
                        <dd>
                            <ul>
                                <li><a href="#">회사소개</a></li>
                                <li><a href="#">공지사항</a></li>
                                <li><a href="#">인재채용</a></li>
                                <li><a href="#">상장문의</a></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="foot_util">
                        <dt>고객지원</dt>
                        <dd>
                            <ul>
                                <li><a href="#">자주하는 질문</a></li>
                                <li><a href="#">카카오톡 문의</a></li>
                                <li><a href="#">거래 이용 안내</a></li>
                                <li><a href="#">입출금 이용 안내</a></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="foot_util">
                        <dt>고객센터</dt>
                        <dd class="cs_number">
                            <p>1588-0000<span>(운영시간 : 평일 10시~18시)</span></p>
                        </dd>
                    </dl>
                </div>
                <div class="foot_btm_side">
                    <address>
                        <dl>
                            <dt>주소</dt>
                            <dd>케이시엑스 주식회사  서울 영등포구 여의나루로4길 18 키움파이낸스스퀘어</dd>
                        </dl>
                    </address>
                    <div class="company_info">
                        <ul>
                            <li><strong>대표이사</strong>김키움</li>
                            <li><strong>사업자등록번호</strong>105-85-19585</li>
                            <li class="link"><a href="#">이용약관</a></li>
                            <li class="link"><a href="#">개인정보처리방침</a></li>
                        </ul>
                    </div>
                    <p class="copyright">Copyrightⓒ KCX. All rights reserved.</p>
                    <ul class="sns_link_list">
                        <li class="link01"><a href="#"><span class="blind">ISMSP</span></a></li>
                        <li class="link02"><a href="#"><span class="blind">페이스북</span></a></li>
                        <li class="link03"><a href="#"><span class="blind">트위터</span></a></li>
                        <li class="link04"><a href="#"><span class="blind">유투브</span></a></li>
                        <li class="link05"><a href="#"><span class="blind">블로그</span></a></li>
                        <li class="link06"><a href="#"><span class="blind">인스타그램</span></a></li>
                        <li class="link07"><a href="#"><span class="blind">카카오톡</span></a></li>
                    </ul>
                </div>
            </div>
        </footer>
        <!-- //footer -->
    </div>

    <div class="dim" style="display:block;" v-if="noticeLayer"></div>
    <!-- 공지사항 팝업 -->
    <section class="popup s_size active" v-if="noticeLayer">
        <dl>
            <dt class="pop_title"><span class="tit_txt">긴급공지</span></dt>
            <dd class="pop_content pop_main_noti">
                <Scroll class="noti_cnts_zone">
                    <p class="tit_txt">전기통신금융 주의 안내 전기통신금융 주의 안내 전기통신금융 주의 안내 전기통신금융 주의 안내</p>
                    <p class="noti_date">2022.04.25  16:23:12</p>
                    <ul class="list_dot_type noti_type">
                        <li>씨티네트웍스 6(사모/전/풋)</li>
                        <li>
                            1. 행사기간종료일 : 2022. 05. 28 <br>
                            2. 신청마감시간 : 2022. 05. 27. 오전 10시 마감 <br>
                            3. 행사비율 : 100% <br>
                            4. 행사가격 : 2,380원 <br>
                        </li>
                        <li>
                            기타 <br>
                            - 씨티네트웍스 6(사모/전/풋) 전환사채(CB) 행사기간 종료와 관련하여 종료 이후에는 전환신청 권리의 가치가 소멸하는 바, 해당 종목 보유자들의 원활한 권리행사를 위하여 행사기간 종료일 등을 확인하시기 바랍니다. <br>
                            또한 행사기간 종료일의 예탁결제원 통보시간을 고려하시어 신청마감 시간을 준수할 수 있도록 업무협조 부탁드립니다. <br>
                            여 행사기간 종료일 등을 확인하시기 바랍니다. <br>
                            또한 행사기간 종료일의 예탁결제원 통보시간을 고려하시어 신청마감 시간을 준수할 수 있도록 업무협조 부탁드립니다. 
                        </li>
                    </ul>
                </Scroll>
            </dd>
            <dd class="pop_btns">
                <button type="button" class="btn xl dblue" @click="noticeLayerClose($event)"><span>확인</span></button>
            </dd>
        </dl>
        <button type="button" class="btn_pop_close" @click="noticeLayerClose($event)"><span class="blind">닫기</span></button>
    </section>
    <!-- //공지사항 팝업 -->

    <!-- 토스트팝업 -->
    <!--매수 시 buying, 매도 시 sell, 거부 시 reject-->
    <div class="notice_popup" v-bind="inhwaJJang('reject')" v-if="toastPopup" style="border:1px solid red;">
        <div class="tit">
            <strong>{{noticeTxt1}}</strong>
            <p>비트코인</p>
            <span>BTC/BTC</span>
        </div>
        <div class="txt">
            <dl>
                <dt>체결가격</dt>
                <dd>999,999,999,999 BTC</dd>
                <dt>주문가격</dt>
                <dd>999,999,999,999 BTC</dd>
            </dl>
            <dl>
                <dt>체결가격</dt>
                <dd>999,999,999,999 BTC</dd>
                <dt>주문수량</dt>
                <dd>999,999,999,999 BTC</dd>
            </dl>
            <dl>
                <dt class="textType" :class="{reject:noticeState=='reject'}">{{noticeTxt2}}</dt>
                <dd>999,999,999,999 BTC</dd>
                <dd>999,999,999,999 KRW</dd>
            </dl>
        </div>
        <button type="button" class="btn_pop_close" @click="noticeLayerClose($event)"><span class="blind">닫기</span></button>
    </div>
    <!-- //토스트팝업 -->

</template>

<script>
    import { VueDraggableNext } from "vue-draggable-next";

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import SwiperCore, {Autoplay,Pagination,Navigation} from 'swiper/core';
    // install Swiper modules
    SwiperCore.use([Autoplay,Pagination,Navigation]);

    export default {
        name : "W_COMHOM001001",

        components: {
            Swiper,
            SwiperSlide,
            draggable: VueDraggableNext,
        },
        data(){
            return{
                noticeTxt1 : "매수거부알림",
                noticeTxt2 : "주문금액",
                noticeState : "reject",
                toastPopup :true,
                setLayer : false,
                coinSrchLayer : false,
                depth_layer : false,
                gnb_height : false,
                layerShow: true,
                swiper_header :null,
                swiperOption: { 
                    direction :"vertical",                    
                    slidesPerView: "auto",
                    loop: true, 
                },
                swiper_visual :null,
                swOption: { 
                    direction :"horizontal",                    
                    slidesPerView: "auto",
                    loop: true, 
                },
                swIssue :null,
                issueOption: { 
                    direction :"horizontal",                    
                    slidesPerView: "auto",
                    loop: true, 
                },
                currentTab : 0,
                homeTab : 0,
                isActive: true,
                layerFv : false,
                layerFv2 : false,
                layerFv3 : false,
                layerFv4 : false,
                layerUnit : false,
                addClass : false,
                noticeLayer : false,
                sortOpt : 0,
                dragCoinList: [
                    { title_name : "키움이가 고민중",title_bar:true},
                    { kr_name: '트론', en_name: 'TRX/KRW', current_price :'250,563', sub_current_price :'99,999,999KRW', fluctuate_per : '52%', fluctuate_price : '123,236', transaction_price : '240,222,563', sub_transaction_price :'999,999백만', color_price : 'up',title_bar:false},
                    { kr_name: '비트코인', en_name: 'BTC/KRW', current_price :'250,222', fluctuate_per : '-79%', fluctuate_price : '-645,263', transaction_price : '750,222,563', color_price : 'down',title_bar:false},
                    { kr_name: '리플', en_name: 'XRP/KRW', current_price :'122,563', fluctuate_per : '-19%', fluctuate_price : '-293,271,321', transaction_price : '120,222,563', color_price : 'up',title_bar:false},
                    { kr_name: '이더리움', en_name: 'ETH/KRW', current_price :'22,563', fluctuate_per : '4%', fluctuate_price : '209', transaction_price : '954,222,563', color_price : 'up',title_bar:false },
                    { kr_name: '트론', en_name: 'TRX/KRW', current_price :'250,563', fluctuate_per : '52%', fluctuate_price : '23,236', transaction_price : '240,222,563', color_price : 'up',title_bar:false },
                    { title_name : "키움이가 찜한 거래소",title_bar:true},
                    { kr_name: '비트코인', en_name: 'BTC/KRW', current_price :'250,222', fluctuate_per : '-79%', fluctuate_price : '-645,263', transaction_price : '750,222,563', color_price : 'down' ,title_bar:false},
                    { title_name : "",title_bar:true},
                    { kr_name: '리플', en_name: 'XRP/KRW', current_price :'122,563', fluctuate_per : '-19%', fluctuate_price : '-293,271,321', transaction_price : '120,222,563', color_price : 'down',title_bar:false },
                    { kr_name: '이더리움', en_name: 'ETH/KRW', current_price :'22,563', fluctuate_per : '4%', fluctuate_price : '209', transaction_price : '954,222,563', color_price : 'up',title_bar:false },
                    { kr_name: '트론', en_name: 'TRX/KRW', current_price :'250,563', fluctuate_per : '-52%', fluctuate_price : '-123,236', transaction_price : '240,222,563', color_price : 'up,title_bar:false'},
                    { kr_name: '비트코인', en_name: 'BTC/KRW', current_price :'250,222', fluctuate_per : '-79%', fluctuate_price : '-645,263', transaction_price : '750,222,563', color_price : 'down' ,title_bar:false},
                    { kr_name: '리플', en_name: 'XRP/KRW', current_price :'122,563', fluctuate_per : '-19%', fluctuate_price : '-293,271,321', transaction_price : '120,222,563', color_price : 'down',title_bar:false },
                    { kr_name: '이더리움', en_name: 'ETH/KRW', current_price :'22,563', fluctuate_per : '-4%', fluctuate_price : '-209', transaction_price : '954,222,563', color_price : 'down' ,title_bar:false},
                ],
                dragging: true,
            };
        },
        methods: {
            rank_layer(){
                this.layerShow = !this.layerShow;
            },
            depth_toggle(el){
                this.depth_layer = true;
                this.gnb_height = true;
            },
            depth_close(){
                this.depth_layer = false;
                this.gnb_height = false;
            },
            headerSw(swiper){
                this.swiper_header = swiper;
            },
            swVisual(swiper){
                this.swiper_visual = swiper;
            },
            tabMenu(num){
                this.currentTab = num;
            },
            tabMenuHome(num){
                this.homeTab = num;
            },
            toggleClass(){
                this.isActive = !this.isActive;
            },
            noticeLayerClose : function(e){
                this.noticeLayer = false;
            },
            sorting : function(e){
                this.sortOpt++;
                e.currentTarget.setAttribute("class","");
                e.currentTarget.classList.add("btn_sort");
                switch (this.sortOpt) {
                    case 1:
                    e.currentTarget.classList.add("down");
                    break;
                    case 2:
                    e.currentTarget.classList.add("up");
                    break;      
                    default:      
                        this.sortOpt=0;
                    break;
                }
            },
            inhwaJJang : function (type){
                if(type=='buying'){
                    this.noticeTxt1="매수체결알림";
                    this.noticeTxt2="체결금액";
                    console.log("인화야 안녕?",type);
                }else if(type=='sell'){
                    this.noticeTxt1="매도체결알림";
                    this.noticeTxt2="체결금액";
                    console.log("인화야 안녕?",type);

                }else{
                    this.noticeTxt1="매수거부알림";
                    this.noticeTxt2="주문금액";
                    console.log("인화야 안녕?",type);

                }
            }
        },
    }
</script>

<style lang="scss" scoped></style>