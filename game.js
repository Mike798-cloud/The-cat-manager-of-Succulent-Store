"use strict";

(() => {
  const SAVE_KEY = "cat_succulent_shop_save_v1";
  const TOTAL_CHAPTERS = 12;
  const TOTAL_EGGS = 41;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const PLANTS = [
    { id: "taodan", name: "桃蛋", group: "hot", color: "#e9a7a4", accent: "#f6d2c5", desc: "圆润粉叶，像落在窗台上的一颗桃子。" },
    { id: "xiongtongzi", name: "熊童子", group: "hot", color: "#84aa71", accent: "#c07a5b", desc: "叶尖带小爪印，最像猫店长的手套。" },
    { id: "yulu", name: "玉露", group: "hot", color: "#84c4a3", accent: "#d7f2df", desc: "半透明窗叶，适合新手，也适合加班后的眼睛。" },
    { id: "nailao", name: "奶酪", group: "hot", color: "#d5c47d", accent: "#fff0bc", desc: "暖黄叶片，像午后被晒软的一小块奶酪。" },
    { id: "zile", name: "紫乐", group: "hot", color: "#9d88bb", accent: "#dbc7ee", desc: "紫粉色调，安静但很会长成惊喜。" },
    { id: "jingye", name: "静夜", group: "hot", color: "#9fcf9a", accent: "#e2f4d6", desc: "端正莲座，外婆最爱摆在收银台左侧。" },
    { id: "chengmenglu", name: "橙梦露", group: "hot", color: "#e2a05d", accent: "#ffd7a3", desc: "橙色叶缘，像日落时分的老社区。" },
    { id: "shengshihua", name: "生石花", group: "hot", color: "#b99b78", accent: "#f0d6b6", desc: "像小石头一样沉默，却会突然开花。" },
    { id: "qianchuan", name: "钱串", group: "hot", color: "#6fa36b", accent: "#d7e8b6", desc: "一节一节往上长，适合新年订单。" },
    { id: "xicaishu", name: "吸财树", group: "hot", color: "#6a9a6c", accent: "#b7d694", desc: "叶片像小小吸管，听起来很会招财。" },

    { id: "lanxinghua", name: "蓝星花", group: "flower", color: "#82b9df", accent: "#f7db79", desc: "蓝色小星，适合给情绪开一扇窗。" },
    { id: "fenxueshan", name: "粉雪山玫瑰", group: "flower", color: "#eaa2b3", accent: "#fff0f2", desc: "粉白层叠，像一封没寄出的柔软信。" },
    { id: "mansky", name: "蓝色满天星", group: "flower", color: "#89a9de", accent: "#e4ecff", desc: "细碎蓝点，像夜风里散开的星。" },
    { id: "yangganju", name: "洋甘菊", group: "flower", color: "#fff0a6", accent: "#f2b84c", desc: "带着淡淡茶香，适合写给失恋的人。" },
    { id: "xiaoju", name: "小雏菊", group: "flower", color: "#fff7dd", accent: "#f2bf4d", desc: "普通但真诚，像一句刚好递到手里的安慰。" },
    { id: "fenglingcao", name: "白色风铃草", group: "flower", color: "#f8f6ea", accent: "#c4d7d8", desc: "风一吹就轻轻晃，像外婆门口的铃声。" },
    { id: "margaret", name: "玛格丽特", group: "flower", color: "#fff1b6", accent: "#e9a34c", desc: "一捧小太阳，适合送给总忘记夸自己的人。" },
    { id: "youhuahunli", name: "油画婚礼", group: "flower", color: "#e9a0c2", accent: "#9bb97d", desc: "斑斓叶片，像旧相册里被阳光染过的婚礼。" },

    { id: "changshouhua", name: "长寿花", group: "green", color: "#de7462", accent: "#6fa66b", desc: "年节常客，给长辈的祝福要热闹一点。" },
    { id: "junzilan", name: "君子兰", group: "green", color: "#d97145", accent: "#477f56", desc: "叶片端正，开花时像小小火炬。" },
    { id: "taiyanghua", name: "太阳花", group: "green", color: "#f5b246", accent: "#85a75d", desc: "晒一点光就认真开放，像不服输的孩子。" },
    { id: "xunzhangju", name: "勋章菊", group: "green", color: "#ef9b4d", accent: "#a65d45", desc: "花心像小勋章，稳稳压在加重陶盆里。" },
    { id: "bohe", name: "薄荷", group: "green", color: "#70b778", accent: "#d9f1d4", desc: "揉一揉指尖清凉，雨天闻起来格外醒神。" },
    { id: "guibeizhu", name: "龟背竹", group: "green", color: "#568b5c", accent: "#b6d8a8", desc: "大叶子像一把旧伞，替窗台遮住太响的世界。" },
    { id: "wenzhu", name: "文竹", group: "green", color: "#6da373", accent: "#d9efcf", desc: "细细密密，像外婆写字时的笔画。" },
    { id: "qinyerong", name: "琴叶榕", group: "green", color: "#608d58", accent: "#ccdda2", desc: "叶片像琴，适合摆在门口听风。" },

    { id: "maocao", name: "猫草", group: "hidden", color: "#75b96a", accent: "#dff1c8", desc: "猫店长会认真嚼三口，然后装作没发生。" },
    { id: "maobohe", name: "猫薄荷", group: "hidden", color: "#78b98b", accent: "#c8e9d7", desc: "打开后，小三花的尾巴会快乐到失去管理。" },
    { id: "sanhua", name: "三花猫爪", group: "hidden", color: "#f0bd83", accent: "#4b3425", desc: "外婆培育的变异多肉，叶片天然带三色猫爪纹。" },
    { id: "fenbanxianren", name: "粉斑点迷你仙人球", group: "hidden", color: "#79b07e", accent: "#eda0a7", desc: "粉色小刺座，像害羞却努力防守的小刺猬。" },
    { id: "xiangrikui", name: "小时候种的向日葵花苗", group: "hidden", color: "#f1b847", accent: "#7e5b2c", desc: "当年的一粒籽，悄悄在后院等你长大。" },
    { id: "liuxingcao", name: "每日流星雨夜光草", group: "hidden", color: "#9cc9ff", accent: "#fff6a4", desc: "每天 17:00–20:00 会在窗边发出像流星尾巴一样的光。" }
  ];

  const PLANT_BY_ID = Object.fromEntries(PLANTS.map((plant) => [plant.id, plant]));

  const ACHIEVEMENTS = [
    "推开玻璃门", "第一次被允许靠近", "膝上呼噜", "猫粮供应商", "梳毛新手", "干洗泡泡", "逗猫棒冠军", "猫窝安置员", "胖店长养成", "猫爪信使",
    "左耳的秘密", "鱼干背景音", "深夜守铺", "猫薄荷事故", "摸到第十下", "尾巴天气预报", "小爪印收藏家", "永远的猫店长",
    "价格牌归位", "玻璃门磁吸修复", "向阳窗台", "第一位客人", "选对新手多肉", "失恋便签", "雨雾擦净", "年节长寿花", "狗狗友好方案", "七片钥匙",
    "1998相册", "后院开锁", "稀有植物复苏", "外婆日记", "记忆拼图", "阿花归来", "城市的温柔告别", "留在铺子里", "全图鉴点亮", "全章节通关",
    "营业无差评", "风铃红线", "水缸小鱼", "旧围裙口袋", "玻璃弹珠", "蝉壳书签", "月光浇水", "屋顶鸽子", "纸鹤留言", "自行车铃", "每日傍晚流星雨", "每日夜光草"
  ].map((name, index) => ({ id: `ach${String(index + 1).padStart(2, "0")}`, name }));

  const ACH = Object.fromEntries(ACHIEVEMENTS.map((ach) => [ach.name, ach.id]));

  const EGG_NAMES = {
    paw10: "肉垫连点十次：猫店长在玻璃上按出一串梅花印。",
    priceReset: "价格牌错三次：小猫把标签扒回正确那一堆。",
    wrongPlantHint: "选错植物两次：猫店长叼来小鱼干形状的提示。",
    feedBurp: "喂猫粮三次：小三花打了一个很小声的嗝。",
    longNote: "便签写满五十字：猫店长把纸条叼到客人手边。",
    rainPaw: "擦雨窗十五次：窗台浮出一排湿漉漉小爪印。",
    catnipDrunk: "猫草加猫薄荷：猫店长短暂失去店长威严。",
    photo1998: "1998相册闪回：旧照片里，阿花正趴在外婆账本上。",
    emptyPotsSun: "把空盆搬到太阳下：夜里猫店长替它们巡逻。",
    finalDoodle: "结局涂鸦玻璃弹珠：童年的小太阳滚回掌心。",
    leftEarVoice: "左耳缺角点三次：听见外婆轻轻喊了一声阿花。",
    idleBloom: "真结局静置三秒：全铺多肉一起开花，金色爪印落满窗台。",
    meteorEvening: "每日 17:00–20:00 限定流星雨：屋顶、萤火虫罐和夜光草同时亮起。",
    midnightLogin: "零点登录：收银机显示“猫店长已值夜班”。",
    sunsetGlow: "夕阳时分：玻璃门把整条巷子染成橘子汽水色。",
    localRain: "本地雨声：雨伞架里多出一把外婆的小花伞。",
    fishVat: "水缸看十秒：两条小鱼抢走了猫店长的注意力。",
    redString: "风铃五次：红绳绕住旧钥匙，像一个没说完的结。",
    backgroundFish: "背景停留三分钟：猫店长偷偷吃掉一枚鱼形饼干。",
    chamomileLetter: "洋甘菊七次：抽屉里出现外婆写给你的短笺。",
    butterflyPollen: "蝴蝶停三次：向日葵苗沾上金色花粉。",
    oldCalendar: "旧日历：2003 年那一页没有被撕掉。",
    childhoodMarble: "童年玻璃珠：柜台缝里滚出一颗蓝绿色小星球。",
    broomMark: "扫帚痕迹：后门地面有一枚三花猫爪。",
    radio1998: "老收音机：传出 1998 年夏天的评书片段。",
    drawerButton: "抽屉纽扣：纽扣背面刻着你的乳名。",
    teaSteam: "茶杯热气：热气里浮出外婆的笑脸轮廓。",
    shoppingList: "进货单：最后一行写着“给孩子留一盆太阳花”。",
    grandmaGlasses: "老花镜：戴上后能看见便签背面的浅字。",
    windowsillPrint: "窗台爪印：每次关店后都会多一枚。",
    orangePeel: "橘子皮：猫店长嫌弃地后退三步。",
    bellShadow: "门铃影子：影子里有一只成年三花。",
    ledgerFlower: "账本压花：夹着一朵已经干透的小雏菊。",
    rooftopPigeon: "屋顶鸽子：鸽子替猫店长保管过钥匙碎片。",
    paperCrane: "纸鹤留言：展开后写着“别怕回来晚”。",
    cicadaShell: "蝉壳书签：夏天从来没有真正离开。",
    moonWater: "月光浇水：夜里浇过的玉露会透明一点点。",
    rainyUmbrella: "雨伞倒影：倒影里外婆还在擦柜台。",
    seedPacket: "种子纸袋：里面剩着三粒向日葵籽。",
    oldApron: "旧围裙口袋：摸出半张猫粮优惠券。",
    bicycleBell: "自行车铃：巷口响起放学时的叮铃声。"
  };

  const FREE_EGG_IDS = [
    "midnightLogin", "sunsetGlow", "localRain", "fishVat", "redString", "backgroundFish", "chamomileLetter", "butterflyPollen",
    "oldCalendar", "childhoodMarble", "broomMark", "radio1998", "drawerButton", "teaSteam", "shoppingList", "grandmaGlasses",
    "windowsillPrint", "orangePeel", "bellShadow", "ledgerFlower", "rooftopPigeon", "paperCrane", "cicadaShell",
    "moonWater", "rainyUmbrella", "seedPacket", "oldApron", "bicycleBell"
  ];

  function freshState() {
    return {
      started: false,
      chapter: 1,
      supportPrompted: false,
      log: [],
      inventory: [],
      plants: [],
      achievements: [],
      eggs: [],
      ch: {},
      cat: {
        name: "左耳缺角的小三花",
        affection: 0,
        pet: 0,
        feed: 0,
        groom: 0,
        bathe: 0,
        play: 0,
        ear: 0
      },
      ui: {
        coverCat: 0,
        forceMeteor: false
      }
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return freshState();
      return Object.assign(freshState(), JSON.parse(raw));
    } catch (error) {
      console.warn("存档读取失败，已新建存档。", error);
      return freshState();
    }
  }

  function saveState() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function getCh(chapter = state.chapter) {
    const key = String(chapter);
    if (!state.ch[key]) state.ch[key] = {};
    return state.ch[key];
  }

  function uniquePush(list, value) {
    if (!list.includes(value)) list.push(value);
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toast(message) {
    const host = $("#toastHost");
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    host.appendChild(el);
    window.setTimeout(() => el.remove(), 3500);
  }

  function addLog(message) {
    uniquePush(state.log, message);
  }

  function unlockAchievement(name) {
    const id = ACH[name];
    if (id && !state.achievements.includes(id)) {
      state.achievements.push(id);
      toast(`成就解锁：${name}`);
    }
  }

  function unlockEgg(id) {
    if (!EGG_NAMES[id] || state.eggs.includes(id)) return;
    state.eggs.push(id);
    toast(`彩蛋发现：${EGG_NAMES[id]}`);
  }

  function discoverPlant(id) {
    if (PLANT_BY_ID[id] && !state.plants.includes(id)) {
      state.plants.push(id);
      toast(`图鉴点亮：${PLANT_BY_ID[id].name}`);
    }
  }

  function addInventory(item) {
    if (!state.inventory.includes(item)) {
      state.inventory.push(item);
      toast(`获得道具：${item}`);
    }
  }

  function hasItem(item) {
    return state.inventory.includes(item);
  }

  function advanceChapter(next) {
    state.chapter = next;
    if (next === 12) unlockAchievement("全章节通关");
    addLog(`第 ${next - 1} 章完成，玻璃门上的营业灯又亮了一格。`);
    saveState();
    render();
  }

  function maybePromptSupport() {
    if (state.supportPrompted) return;
    state.supportPrompted = true;
    saveState();
    window.setTimeout(() => {
      if (window.Paywall && !window.Paywall.hasPaid()) {
        window.Paywall.show({ title: "给猫店长加一颗小鱼干" });
      }
    }, 420);
  }

  function isMeteorWindow(date = new Date()) {
    const hour = date.getHours();
    return state.ui.forceMeteor || (hour >= 17 && hour < 20);
  }

  function stageName() {
    if (state.cat.affection >= 18 || state.chapter >= 12) return "阶段三：胖乎乎的松弛猫店长";
    if (state.cat.affection >= 8 || state.chapter >= 6) return "阶段二：会跟在脚边巡店的黏人小猫";
    return "阶段一：炸毛怕生但会偷偷观察的小奶猫";
  }

  function catStageClass() {
    if (state.cat.affection >= 18 || state.chapter >= 12) return "stage3";
    if (state.cat.affection >= 8 || state.chapter >= 6) return "stage2";
    return "stage1";
  }

  function progressPercent() {
    const chapterPart = ((state.chapter - 1) / (TOTAL_CHAPTERS - 1)) * 82;
    const collectionPart = Math.min(18, (state.plants.length / PLANTS.length) * 10 + (state.achievements.length / ACHIEVEMENTS.length) * 8);
    return Math.max(0, Math.min(100, Math.round(chapterPart + collectionPart)));
  }

  function plantSVG(plant) {
    const color = plant.color;
    const accent = plant.accent;
    if (plant.group === "flower") {
      return `
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 82 C48 62 51 45 53 31" stroke="#5f9361" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M51 60 C35 51 28 58 20 68 C35 70 45 66 51 60Z" fill="#7fb476" opacity=".9"/>
          <path d="M53 55 C70 45 78 52 84 62 C68 66 58 62 53 55Z" fill="#6fa66b" opacity=".9"/>
          ${[0, 60, 120, 180, 240, 300].map((deg) => `<ellipse cx="50" cy="28" rx="11" ry="20" fill="${color}" transform="rotate(${deg} 50 42)" opacity=".95"/>`).join("")}
          <circle cx="50" cy="42" r="12" fill="${accent}"/>
          <path d="M31 84 H69 L64 96 H36Z" fill="#b66f42"/>
        </svg>`;
    }
    if (plant.group === "green") {
      return `
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M50 88 C48 66 50 44 50 24" stroke="#5f9361" stroke-width="5" fill="none" stroke-linecap="round"/>
          ${[-32, -18, -4, 14, 28].map((deg, i) => `
            <ellipse cx="${38 + i * 5}" cy="${54 - i * 7}" rx="13" ry="24" fill="${i % 2 ? color : accent}" transform="rotate(${deg} ${38 + i * 5} ${54 - i * 7})" opacity=".92"/>
            <ellipse cx="${63 - i * 4}" cy="${58 - i * 7}" rx="12" ry="23" fill="${color}" transform="rotate(${-deg} ${63 - i * 4} ${58 - i * 7})" opacity=".9"/>
          `).join("")}
          <path d="M30 84 H70 L65 97 H35Z" fill="#a9643d"/>
        </svg>`;
    }
    if (plant.group === "hidden" && plant.id === "sanhua") {
      return `
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M30 83 H70 L65 96 H35Z" fill="#a9643d"/>
          <circle cx="50" cy="45" r="24" fill="${color}"/>
          <circle cx="40" cy="38" r="10" fill="#fff2d5"/>
          <circle cx="60" cy="38" r="10" fill="#3d2c22"/>
          <circle cx="50" cy="58" r="11" fill="#d98755"/>
          <circle cx="36" cy="62" r="5" fill="${accent}"/>
          <circle cx="64" cy="62" r="5" fill="#fff2d5"/>
        </svg>`;
    }
    return `
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M30 84 H70 L65 97 H35Z" fill="#a9643d"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const deg = i * 30;
          const rx = i % 2 ? 13 : 16;
          return `<ellipse cx="50" cy="44" rx="${rx}" ry="26" fill="${i % 3 === 0 ? accent : color}" transform="rotate(${deg} 50 54)" opacity=".9"/>`;
        }).join("")}
        <circle cx="50" cy="54" r="10" fill="${accent}" opacity=".92"/>
      </svg>`;
  }

  function plantCard(id, action, selected = false, labelPrefix = "") {
    const plant = PLANT_BY_ID[id];
    if (!plant) return "";
    return `
      <button class="plant-card ${selected ? "selected" : ""}" data-action="${action}" data-value="${plant.id}">
        <span class="plant-art">${plantSVG(plant)}</span>
        <span class="plant-name">${labelPrefix}${escapeHTML(plant.name)}</span>
        <span class="plant-desc">${escapeHTML(plant.desc)}</span>
      </button>`;
  }

  function panel(title, copy, body = "") {
    return `
      <div class="panel-title"><i></i><h3>${escapeHTML(title)}</h3></div>
      <p class="story-copy">${copy}</p>
      ${body}`;
  }

  function sceneKind() {
    if (state.chapter === 6) return "rain";
    if (state.chapter === 8 || state.chapter === 10) return "night";
    if (state.chapter === 9) return "yard";
    if (state.chapter === 11 || state.chapter === 12) return "ending";
    return "shop";
  }

  function renderScene() {
    const stage = $("#sceneStage");
    const kind = sceneKind();
    const meteor = isMeteorWindow();
    stage.innerHTML = `
      <div class="visual-${kind}">
        <div class="windchime"></div>
        <div class="shelf"></div>
        ${kind === "yard" ? `<div class="greenhouse"></div>` : ""}
        ${kind !== "night" ? `<div class="plant-row"><i></i><i></i><i></i><i></i><i></i></div>` : ""}
        <div class="shop-cat"></div>
        ${meteor ? `<div class="meteor-banner" style="position:absolute;left:18px;right:18px;top:18px"><b>每日傍晚限定：</b>17:00–20:00，流星雨和萤火虫会在窗台外亮起。</div>` : ""}
      </div>`;
  }

  function focusText() {
    const map = {
      1: "先安抚躲在花盆后的三花小猫。",
      2: "只整理一件事：价格牌、门吸、向阳窗台按顺序来。",
      3: "帮第一位客人选一盆真正适合新手的多肉。",
      4: "用猫粮和轻摸，让小猫第一次跳到你膝上。",
      5: "给失恋的客人挑花，并写一张不敷衍的便签。",
      6: "擦清雨雾，再完成张奶奶的新年花订单。",
      7: "为狗狗家庭挑一盆稳当、不容易被扑倒的植物。",
      8: "在旧收银台附近找齐七片后院钥匙。",
      9: "打开三年没进人的后院花房，读完外婆的 1998 日记。",
      10: "把阿花、外婆和你的记忆按时间拼回去。",
      11: "做出结局选择：回城，还是留下继续营业。",
      12: "自由营业：图鉴、成就、彩蛋和猫店长都留在窗台。"
    };
    return map[state.chapter] || "慢慢营业。";
  }

  function renderChapter() {
    const ch = getCh();
    switch (state.chapter) {
      case 1: return renderCh1(ch);
      case 2: return renderCh2(ch);
      case 3: return renderCh3(ch);
      case 4: return renderCh4(ch);
      case 5: return renderCh5(ch);
      case 6: return renderCh6(ch);
      case 7: return renderCh7(ch);
      case 8: return renderCh8(ch);
      case 9: return renderCh9(ch);
      case 10: return renderCh10(ch);
      case 11: return renderCh11(ch);
      case 12: return renderCh12(ch);
      default: return "";
    }
  }

  function renderCh1(ch) {
    if (!ch.opened) {
      return panel("第 1 章：空铺初遇", "老社区午后的光落在卷帘门缝里。你把钥匙插进外婆留下的玻璃门，听见里面传来一声很轻的“喵”。", `
        <div class="note-box">门把手上贴着外婆的旧便签：<br>“如果有小猫躲在桃蛋后面，别急着抱它。先把灯打开，让它知道你回来了。”</div>
        <div class="action-row"><button class="action" data-action="open-door">慢慢推开玻璃门</button></div>
      `);
    }
    if (!ch.calmed) {
      return panel("花盆后的左耳小猫", "三花奶猫从桃蛋盆后探出半张脸。它左耳缺了一个小小的角，眼神却像认识你很久。", `
        <div class="plant-grid">${plantCard("taodan", "noisy-reach")}${plantCard("yulu", "soft-call")}</div>
        <p class="hint-copy">提示：别急着伸手。选一个更温柔的方式靠近。</p>
      `);
    }
    return panel("外婆的第一张便签", "小猫终于从花盆后走出来，踩过柜台上的灰，停在一张泛黄便签旁边。", `
      <div class="letter-box">“这间铺子空着也没关系。花会等，人也会等。要是阿花回来了，就让它继续当店长。”</div>
      <div class="action-row"><button class="action" data-action="read-first-note">收好便签，开始营业</button></div>
    `);
  }

  function renderCh2(ch) {
    if (!ch.priceDone) {
      const order = ch.priceOrder || [];
      const options = [
        ["jingye", "静夜 8 元", "小盆、耐看，放在最左。"],
        ["taodan", "桃蛋 12 元", "粉色莲座，别被旧价签遮住。"],
        ["yulu", "玉露 18 元", "半透明窗叶，给新手推荐。"],
        ["xiongtongzi", "熊童子 28 元", "爪尖最贵，猫店长很不服。"]
      ];
      return panel("整理铺面之一：拼回价格牌", "外婆的价格牌散了一柜台。别一次管太多，先按从低到高把四张牌挂回去。", `
        <div class="tag-grid">
          ${options.map(([id, label, desc]) => `
            <button class="tag-card ${order.includes(id) ? "selected" : ""}" data-action="price-tag" data-value="${id}">
              <b>${escapeHTML(label)}</b><span>${escapeHTML(desc)}</span>
            </button>`).join("")}
        </div>
        <p class="hint-copy">已选择：${order.map((id) => PLANT_BY_ID[id].name).join(" → ") || "还没有选择"}</p>
      `);
    }
    if (!ch.magnetDone) {
      const seq = ch.magnetSeq || [];
      return panel("整理铺面之二：修好玻璃门磁吸", "门吸卡住后，门铃会一直叮。猫店长已经把耳朵压低了，所以这次要安静地修。", `
        <div class="tag-grid">
          <button class="tag-card" data-action="magnet-step" data-value="paper"><b>垫一小片旧账本纸</b><span>外婆以前就这么救过松动的门吸。</span></button>
          <button class="tag-card" data-action="magnet-step" data-value="align"><b>对齐铁片</b><span>让磁吸重新咬住中心。</span></button>
          <button class="tag-card" data-action="magnet-step" data-value="hold"><b>轻按三秒</b><span>不是用力，是等它自己合上。</span></button>
        </div>
        <p class="hint-copy">步骤：${seq.join(" → ") || "尚未开始"}</p>
      `);
    }
    if (!ch.sunDone) {
      const selected = ch.sunnyPots || [];
      const ids = ["taodan", "yulu", "jingye", "bohe", "guibeizhu", "shengshihua"];
      return panel("整理铺面之三：搬到向阳窗台", "阳光从右侧窗格照进来。只挑三盆最适合先晒一会儿的多肉，别把薄荷和大叶绿植也拖过去。", `
        <div class="plant-grid">${ids.map((id) => plantCard(id, "sun-pot", selected.includes(id))).join("")}</div>
        <p class="hint-copy">已搬动：${selected.map((id) => PLANT_BY_ID[id].name).join("、") || "暂无"}（选满三盆会自动检查）</p>
      `);
    }
    return panel("铺面重新亮起来", "价格牌、门吸、窗台都回到舒服的位置。小三花蹲在门垫上，像真的在等第一位客人。", `
      <div class="action-row"><button class="action" data-action="finish-ch2">挂上“今日营业”木牌</button></div>
    `);
  }

  function renderCh3(ch) {
    if (!ch.done) {
      const ids = ["yulu", "taodan", "shengshihua", "qinyerong"];
      return panel("第 3 章：首位客人", "一个写代码写到眼圈发青的学生站在门口。他说想要一盆“别太娇气、看着能缓一口气”的植物。", `
        <div class="plant-grid">${ids.map((id) => plantCard(id, "student-plant", ch.choice === id)).join("")}</div>
        <p class="hint-copy">关键词：新手、好活、放在电脑旁也能看着舒服。</p>
      `);
    }
    return "";
  }

  function renderCh4(ch) {
    const ready = ch.pet && ch.feed;
    return panel("第 4 章：午间小憩", "午后的铺子安静下来。小三花还不敢睡得太熟，但它盯着你手里的猫粮，尾巴尖已经叛变。", `
      <div class="note-box">在右侧“猫店长状态”里摸摸和喂猫粮，也可以点下面的快捷按钮。</div>
      <div class="action-row">
        <button class="action" data-action="care-shortcut" data-value="pet">轻轻摸摸额头</button>
        <button class="action" data-action="care-shortcut" data-value="feed">倒一点猫粮</button>
        ${ready ? `<button class="action" data-action="cat-lap">把围裙叠成一个小窝</button>` : ""}
      </div>
      <p class="hint-copy">当前：摸摸 ${ch.pet ? "已完成" : "未完成"} / 猫粮 ${ch.feed ? "已完成" : "未完成"}</p>
    `);
  }

  function renderCh5(ch) {
    if (!ch.flower) {
      const ids = ["yangganju", "fenxueshan", "lanxinghua", "xiaoju"];
      return panel("第 5 章：小姑娘的便签", "一个刚分手的年轻女孩在花架前站了很久。她不想要太隆重的花，只想要“明天醒来还能看见一点温柔”。", `
        <div class="plant-grid">${ids.map((id) => plantCard(id, "heart-flower")).join("")}</div>
      `);
    }
    return panel("写一张不敷衍的便签", `你选了 ${PLANT_BY_ID[ch.flower].name}。花已经包好，剩下的是一张会被她带回家的小纸条。`, `
      <textarea id="encourageNote" placeholder="写一句温柔但不空泛的话。写满 50 字会触发猫店长信使彩蛋。">${escapeHTML(ch.noteText || "")}</textarea>
      <div class="action-row">
        <button class="action" data-action="submit-note">把便签夹进花束里</button>
        <button class="chip" data-action="reselect-flower">重新挑花</button>
      </div>
    `);
  }

  function renderCh6(ch) {
    if ((ch.rainWipes || 0) < 6) {
      return panel("第 6 章：雨天下单", "雨把玻璃窗糊成一片。张奶奶隔着门说，想给家里订一盆过年看着喜庆、寓意也好的花。", `
        <div class="fragment-grid">
          ${Array.from({ length: 6 }, (_, i) => `<button class="fragment" data-action="wipe-drop" data-value="${i}">雨雾 ${i + 1}</button>`).join("")}
        </div>
        <p class="hint-copy">先擦清玻璃，才能看见张奶奶递来的订单字迹。</p>
      `);
    }
    if (!ch.done) {
      const ids = ["changshouhua", "lanxinghua", "bohe", "shengshihua"];
      return panel("雨雾后的新年订单", "字迹终于清楚：张奶奶要送给老伴，想要热闹、长久、名字也吉利。", `
        <div class="plant-grid">${ids.map((id) => plantCard(id, "rain-order", ch.choice === id)).join("")}</div>
        <div class="action-row"><button class="chip" data-action="extra-wipe">再擦一遍窗角</button></div>
        <p class="hint-copy">累计擦窗：${ch.rainWipes || 0} 次。擦到 15 次会出现雨天爪印彩蛋。</p>
      `);
    }
    return "";
  }

  function renderCh7(ch) {
    if (!ch.done) {
      const ids = ["xunzhangju", "qianchuan", "guibeizhu", "fenxueshan"];
      return panel("第 7 章：铲屎官的需求", "一位狗主人抱着被牵引绳缠住的柴犬进门：植物要稳，要不容易被扑倒，最好别太娇气。", `
        <div class="plant-grid">${ids.map((id) => plantCard(id, "dog-plant", ch.choice === id)).join("")}</div>
        <div class="action-row"><button class="chip" data-action="catnip-basket">打开猫草和猫薄荷试种篮</button></div>
      `);
    }
    return "";
  }

  function renderCh8(ch) {
    const found = ch.fragments || [];
    if (found.length < 7) {
      return panel("第 8 章：深夜寻钥匙", "关店后，老收银机自己轻轻响了一声。抽屉缝、算盘后、旧围裙里，都闪着一点点铜色。", `
        <div class="fragment-grid">
          ${Array.from({ length: 7 }, (_, i) => `<button class="fragment ${found.includes(i) ? "found" : ""}" data-action="key-fragment" data-value="${i}">${found.includes(i) ? "已找到" : `碎片 ${i + 1}`}</button>`).join("")}
        </div>
      `);
    }
    if (!ch.photoDone) {
      const order = ch.photos || [];
      const photos = [
        ["1998", "外婆抱回受伤三花阿花", "照片边角写着：它以后就是店长。"],
        ["2003", "空花盆旁的项圈", "阿花离开后，门铃仍会自己响。"],
        ["2026", "你和左耳小猫重逢", "小猫蹲在桃蛋后，像赴一场迟到的约。"]
      ];
      return panel("拼回旧照片", "钥匙碎片合成后，一册老相簿从抽屉底弹出来。按时间把三张照片摆好。", `
        <div class="photo-grid">
          ${photos.map(([id, title, desc]) => `
            <button class="photo-card ${order.includes(id) ? "selected" : ""}" data-action="photo-order" data-value="${id}">
              <b>${escapeHTML(title)}</b><span>${escapeHTML(desc)}</span>
            </button>`).join("")}
        </div>
        <p class="hint-copy">顺序：${order.join(" → ") || "尚未选择"}</p>
      `);
    }
    return panel("后院钥匙复原", "七片钥匙在掌心拼成完整形状。小三花低头闻了闻，把尾巴绕在你的手腕上。", `
      <div class="action-row"><button class="action" data-action="finish-ch8">打开后院门</button></div>
    `);
  }

  function renderCh9(ch) {
    if (!ch.opened) {
      return panel("第 9 章：后院花房", "后院门三年没开，锁眼里却没有锈死。小三花先钻了进去，像熟门熟路的老员工。", `
        <div class="action-row"><button class="action" data-action="open-backyard">用旧钥匙打开后院</button></div>
      `);
    }
    if (!ch.watered) {
      const ids = ["sanhua", "fenbanxianren", "xiangrikui", "liuxingcao", "chengmenglu", "zile", "nailao", "xicaishu"];
      return panel("稀有多肉架", "三十多盆沉睡的多肉挤在温室架上。土还没完全干，像有人偷偷照料过。", `
        <div class="plant-grid">${ids.map((id) => plantCard(id, "rare-water")).join("")}</div>
        <div class="action-row"><button class="chip" data-action="empty-pots">把空盆也搬到太阳下</button></div>
      `);
    }
    return panel("1998 年的猫日记", "花房最里面有一本塑封日记，封面写着：阿花值班记录。", `
      <div class="diary-box">
        1998 年夏，捡到一只左耳受伤的三花。它不肯进家，只肯趴在多肉铺门口。<br>
        后来我懂了，它不是流浪，它是在替这间铺子等一个会回来的人。
      </div>
      <div class="action-row"><button class="action" data-action="read-diary">合上日记，整理记忆</button></div>
    `);
  }

  function renderCh10(ch) {
    const order = ch.memory || [];
    const memories = [
      ["m1998", "1998：外婆救下阿花", "左耳伤口结痂，阿花第一次睡在桃蛋旁。"],
      ["m2003", "2003：阿花意外离开", "项圈留在空盆边，猫魂却没有离开铺子。"],
      ["mchild", "童年：你种下向日葵", "你说长大后要回来开一家永远不催人的店。"],
      ["m2026", "2026：辞职后重逢", "你以为救了小猫，其实是阿花把你带回家。"]
    ];
    if (!ch.done) {
      return panel("第 10 章：记忆碎片", "这一次不是找密码，而是把三个人、两只猫和二十八年的等待摆回正确位置。", `
        <div class="memory-grid">
          ${memories.map(([id, title, desc]) => `
            <button class="memory-card ${order.includes(id) ? "selected" : ""}" data-action="memory-order" data-value="${id}">
              <b>${escapeHTML(title)}</b><span>${escapeHTML(desc)}</span>
            </button>`).join("")}
        </div>
        <p class="hint-copy">顺序：${order.map((id) => memories.find((m) => m[0] === id)?.[1] || id).join(" → ") || "尚未选择"}</p>
      `);
    }
    return panel("真相：等你回家的不是一间空铺", "阿花不是普通的小流浪。它做过外婆的猫店长，也做过这三年里守着空铺的影子。左耳缺角，是它每一次回来都没有丢掉的记号。", `
      <div class="letter-box">外婆留下最后一行字：<br>“人会累，会走远，也会回家。阿花要是认出了你，就请替我抱抱它。”</div>
      <div class="action-row"><button class="action" data-action="finish-ch10">带着真相走到清晨</button></div>
    `);
  }

  function renderCh11(ch) {
    if (ch.falseEnding) {
      return panel("温柔的假结局：回到城市", "你把铺子托给邻居照看，带着猫窝回了城市。小三花没有怪你，只是每天黄昏都会望向窗外。", `
        <p class="ending-copy">这是一个不坏的结局：你学会了停下来。但玻璃门上的“今日营业”，还在等你亲手翻开。</p>
        <div class="action-row"><button class="action" data-action="choose-again">把店钥匙放回掌心</button></div>
      `);
    }
    return panel("第 11 章：结局选择", "清晨的光照在玻璃门上。城市发来新的工作邀请，外婆的旧铺子也终于等到你回应。", `
      <div class="ending-choice">
        <button data-action="ending-city"><b>回到城市</b><span>不是失败，只是先照顾好自己。你会得到一个温柔但未完成的结局。</span></button>
        <button data-action="ending-stay"><b>留下营业</b><span>把辞职后的空白，慢慢种成一排会发光的多肉。</span></button>
      </div>
    `);
  }

  function renderCh12(ch) {
    if (!ch.idleTimerSet) {
      ch.idleTimerSet = true;
      window.setTimeout(() => {
        if (state.started && state.chapter === 12) {
          unlockEgg("idleBloom");
          unlockAchievement("永远的猫店长");
          saveState();
          renderSide();
        }
      }, 3000);
    }
    const meteor = isMeteorWindow();
    const freeButtons = FREE_EGG_IDS.map((id) => `<button data-action="free-egg" data-value="${id}">${escapeHTML(EGG_NAMES[id])}</button>`).join("");
    return panel("第 12 章：永恒铺面", "从今天起，窗台多肉铺不再催你赶路。你可以继续摸猫、浇水、翻图鉴、找彩蛋。猫店长会胖一点，花会慢慢开。", `
      ${meteor ? `<div class="meteor-banner"><b>每日流星雨已开启。</b>现在是 17:00–20:00 的窗台限定时段，屋顶有流星，萤火虫罐会亮，夜光草也会发出淡蓝色的光。</div>` : `<div class="hint-copy">每日 17:00–20:00 再回来，会触发窗台限定流星雨、萤火虫罐和夜光草。</div>`}
      <div class="action-row">
        <button class="action" data-action="open-achievements">查看 50 个成就</button>
        <button class="action" data-action="open-plants">查看 32 植物图鉴</button>
        <button class="chip" data-action="force-meteor">预览流星雨效果</button>
      </div>
      <h3>自由探索彩蛋抽屉</h3>
      <div class="free-table">${freeButtons}</div>
    `);
  }

  function handleAction(action, value, source) {
    const ch = getCh();
    switch (action) {
      case "open-door":
        ch.opened = true;
        discoverPlant("taodan");
        unlockAchievement("推开玻璃门");
        addLog("你推开玻璃门，尘埃在日光里慢慢浮起来。");
        break;

      case "noisy-reach":
        toast("小猫缩回桃蛋后面。它还不熟，先别直接伸手。");
        break;

      case "soft-call":
        ch.calmed = true;
        state.cat.affection += 2;
        discoverPlant("yulu");
        unlockAchievement("第一次被允许靠近");
        addLog("你没有伸手，只是把灯打开。小三花终于从花盆后走出半步。");
        break;

      case "read-first-note":
        ch.noteRead = true;
        addInventory("外婆第一张便签");
        addInventory("木柄小梳");
        addLog("便签背面有一小行字：阿花喜欢午后右侧窗台。");
        advanceChapter(2);
        return;

      case "price-tag":
        choosePriceTag(ch, value);
        break;

      case "magnet-step":
        chooseMagnetStep(ch, value);
        break;

      case "sun-pot":
        chooseSunPot(ch, value);
        break;

      case "finish-ch2":
        discoverPlant("jingye");
        discoverPlant("xiongtongzi");
        discoverPlant("bohe");
        unlockAchievement("向阳窗台");
        addLog("今日营业木牌挂上去时，门铃只响了一下，刚刚好。");
        advanceChapter(3);
        maybePromptSupport();
        return;

      case "student-plant":
        if (value === "yulu") {
          ch.choice = value;
          ch.done = true;
          discoverPlant("yulu");
          addInventory("第一袋猫粮");
          unlockAchievement("猫粮供应商");
          unlockAchievement("第一位客人");
          unlockAchievement("选对新手多肉");
          addLog("学生带走玉露，说它像一块能呼吸的绿色小屏幕。");
          advanceChapter(4);
          return;
        }
        ch.wrong = (ch.wrong || 0) + 1;
        if (ch.wrong >= 2) unlockEgg("wrongPlantHint");
        toast("猫店长用爪子轻轻按住你的袖口：这盆对新手可能太费心了。");
        break;

      case "care-shortcut":
        handleCare(value);
        return;

      case "cat-lap":
        if (getCh(4).pet && getCh(4).feed) {
          addInventory("干洗泡沫");
          state.cat.affection += 3;
          unlockAchievement("膝上呼噜");
          unlockAchievement("干洗泡泡");
          addLog("小三花踩了两下围裙，终于蜷到你膝上，呼噜声像很小的电风扇。");
          advanceChapter(5);
          return;
        }
        toast("它还在观察你。先摸摸，再喂一点猫粮。");
        break;

      case "heart-flower":
        ch.flower = value;
        if (value !== "yangganju" && value !== "xiaoju") {
          ch.wrong = (ch.wrong || 0) + 1;
          toast("这束也漂亮，但小三花把便签推向了更安静的花。");
        } else {
          discoverPlant(value);
        }
        break;

      case "reselect-flower":
        ch.flower = "";
        ch.noteText = "";
        break;

      case "submit-note":
        submitEncourageNote(ch);
        break;

      case "wipe-drop":
      case "extra-wipe":
        ch.rainWipes = (ch.rainWipes || 0) + 1;
        if (ch.rainWipes >= 15) {
          unlockEgg("rainPaw");
          unlockAchievement("小爪印收藏家");
          unlockAchievement("尾巴天气预报");
        }
        if (action === "extra-wipe") toast("窗角被擦得亮晶晶，小猫踩过去留下一点水印。");
        break;

      case "rain-order":
        if (value === "changshouhua") {
          ch.choice = value;
          ch.done = true;
          discoverPlant("changshouhua");
          discoverPlant("qianchuan");
          addInventory("珊瑚绒猫窝");
          unlockAchievement("雨雾擦净");
          unlockAchievement("年节长寿花");
          unlockAchievement("猫窝安置员");
          addLog("张奶奶抱着长寿花离开，伞面上落满温柔的雨声。");
          advanceChapter(7);
          return;
        }
        toast("张奶奶笑着摆手：过年嘛，名字也要吉利些。");
        break;

      case "catnip-basket":
        discoverPlant("maocao");
        discoverPlant("maobohe");
        unlockEgg("catnipDrunk");
        unlockAchievement("猫薄荷事故");
        state.cat.affection += 1;
        break;

      case "dog-plant":
        if (value === "xunzhangju") {
          ch.choice = value;
          ch.done = true;
          discoverPlant("xunzhangju");
          discoverPlant("taiyanghua");
          addInventory("羽毛逗猫棒");
          addInventory("剑麻抓板");
          unlockAchievement("狗狗友好方案");
          unlockAchievement("逗猫棒冠军");
          addLog("勋章菊被放进加重陶盆。柴犬绕着它闻了一圈，决定认可这位新室友。");
          advanceChapter(8);
          return;
        }
        ch.wrong = (ch.wrong || 0) + 1;
        if (ch.wrong >= 2) unlockEgg("wrongPlantHint");
        toast("狗尾巴一扫，这个方案看起来有点危险。换一盆更稳的。");
        break;

      case "key-fragment":
        ch.fragments = ch.fragments || [];
        uniquePush(ch.fragments, Number(value));
        if (ch.fragments.length === 7) {
          addInventory("复原的后院钥匙");
          unlockAchievement("七片钥匙");
          unlockAchievement("深夜守铺");
          toast("七片铜色碎片吸在一起，钥匙齿刚好合上。");
        }
        break;

      case "photo-order":
        choosePhoto(ch, value);
        break;

      case "finish-ch8":
        unlockAchievement("1998相册");
        unlockEgg("photo1998");
        addLog("1998 的阿花、2003 的项圈、2026 的重逢，都被你收进相册。");
        advanceChapter(9);
        return;

      case "open-backyard":
        if (!hasItem("复原的后院钥匙")) {
          toast("还缺后院钥匙。");
          break;
        }
        ch.opened = true;
        unlockAchievement("后院开锁");
        addLog("后院门开了，尘土味、潮湿泥土和猫毛味一起涌出来。");
        break;

      case "rare-water":
        ch.watered = true;
        ["sanhua", "fenbanxianren", "xiangrikui", "liuxingcao", "chengmenglu", "zile", "nailao", "xicaishu", "mansky", "fenglingcao", "margaret", "youhuahunli", "junzilan", "guibeizhu", "wenzhu", "qinyerong"].forEach(discoverPlant);
        unlockAchievement("稀有植物复苏");
        break;

      case "empty-pots":
        unlockEgg("emptyPotsSun");
        break;

      case "read-diary":
        unlockAchievement("外婆日记");
        addLog("日记写到最后一页时，墨水忽然变浅：阿花会认得回家的人。");
        advanceChapter(10);
        return;

      case "memory-order":
        chooseMemory(ch, value);
        break;

      case "finish-ch10":
        unlockAchievement("记忆拼图");
        unlockAchievement("阿花归来");
        addLog("真相浮出水面：猫店长不是你捡到的流浪猫，而是二十八年里一次次回来的阿花。");
        advanceChapter(11);
        return;

      case "ending-city":
        ch.falseEnding = true;
        unlockAchievement("城市的温柔告别");
        break;

      case "choose-again":
        ch.falseEnding = false;
        break;

      case "ending-stay":
        unlockAchievement("留在铺子里");
        unlockAchievement("全图鉴点亮");
        unlockAchievement("营业无差评");
        discoverAllPlants();
        addInventory("永久营业木牌");
        unlockEgg("finalDoodle");
        addLog("你把“今日营业”翻到正面。阿花跳上柜台，像二十八年前那样开始巡店。");
        advanceChapter(12);
        return;

      case "open-achievements":
        openModal(renderAchievementModal());
        break;

      case "open-plants":
        openModal(renderPlantModal());
        break;

      case "force-meteor":
        state.ui.forceMeteor = true;
        unlockEgg("meteorEvening");
        unlockAchievement("每日傍晚流星雨");
        unlockAchievement("每日夜光草");
        discoverPlant("liuxingcao");
        addLog("预览模式开启：流星雨、萤火虫罐和每日夜光草一同亮起。正式触发时间为每天 17:00–20:00。");
        break;

      case "free-egg":
        unlockEgg(value);
        unlockLinkedAchievement(value);
        break;

      default:
        console.warn("未知动作", action, value, source);
    }
    saveState();
    render();
  }

  function choosePriceTag(ch, value) {
    const correct = ["jingye", "taodan", "yulu", "xiongtongzi"];
    ch.priceOrder = ch.priceOrder || [];
    if (ch.priceOrder.includes(value)) return;
    ch.priceOrder.push(value);
    if (ch.priceOrder.length < 4) return;
    if (ch.priceOrder.join("|") === correct.join("|")) {
      ch.priceDone = true;
      discoverPlant("jingye");
      unlockAchievement("价格牌归位");
      addLog("价格牌按从低到高挂好，小三花满意地把尾巴圈成一个句号。");
    } else {
      ch.priceMistakes = (ch.priceMistakes || 0) + 1;
      ch.priceOrder = [];
      if (ch.priceMistakes >= 3) unlockEgg("priceReset");
      toast("顺序不对。小三花把最贵的熊童子标签按在爪子下面。");
    }
  }

  function chooseMagnetStep(ch, value) {
    const correct = ["paper", "align", "hold"];
    ch.magnetSeq = ch.magnetSeq || [];
    ch.magnetSeq.push(value);
    if (ch.magnetSeq.length < 3) return;
    if (ch.magnetSeq.join("|") === correct.join("|")) {
      ch.magnetDone = true;
      unlockAchievement("玻璃门磁吸修复");
      addLog("玻璃门终于能轻轻合上，门铃只发出一声很小的叮。");
    } else {
      ch.magnetSeq = [];
      toast("步骤乱了，门铃叮到猫店长眯起眼。重新来。");
    }
  }

  function chooseSunPot(ch, value) {
    const correct = ["taodan", "yulu", "jingye"];
    ch.sunnyPots = ch.sunnyPots || [];
    if (ch.sunnyPots.includes(value)) {
      ch.sunnyPots = ch.sunnyPots.filter((id) => id !== value);
      return;
    }
    ch.sunnyPots.push(value);
    if (ch.sunnyPots.length < 3) return;
    if (correct.every((id) => ch.sunnyPots.includes(id))) {
      ch.sunDone = true;
      correct.forEach(discoverPlant);
      unlockAchievement("向阳窗台");
      addLog("三盆多肉在向阳窗台排成一排，叶尖被照得透明。");
    } else {
      ch.sunnyPots = [];
      toast("薄荷和大叶植物不适合先挤到这片强光里。猫店长用尾巴把它们扫回阴影。");
    }
  }

  function submitEncourageNote(ch) {
    const textarea = $("#encourageNote");
    const note = (textarea?.value || ch.noteText || "").trim();
    ch.noteText = note;
    if (!["yangganju", "xiaoju"].includes(ch.flower)) {
      toast("这束花太像隆重的祝福了。换一束更适合陪她慢慢恢复的花吧。");
      return;
    }
    if (note.length < 8) {
      toast("便签还太短。别讲大道理，写一句能陪她走到明天的话。");
      return;
    }
    if (note.length >= 50) unlockEgg("longNote");
    discoverPlant("yangganju");
    discoverPlant("xiaoju");
    addInventory("猫爪便签夹");
    unlockAchievement("失恋便签");
    unlockAchievement("猫爪信使");
    addLog(`你写下：“${note.slice(0, 26)}${note.length > 26 ? "……" : ""}”小三花把便签叼到了客人手边。`);
    advanceChapter(6);
  }

  function choosePhoto(ch, value) {
    const correct = ["1998", "2003", "2026"];
    ch.photos = ch.photos || [];
    if (ch.photos.includes(value)) return;
    ch.photos.push(value);
    if (ch.photos.length < 3) return;
    if (ch.photos.join("|") === correct.join("|")) {
      ch.photoDone = true;
      unlockEgg("photo1998");
      addLog("相册顺序归位时，1998 的那张照片短暂亮了一下。");
    } else {
      ch.photos = [];
      toast("照片顺序不对。先从外婆救下阿花的夏天开始。");
    }
  }

  function chooseMemory(ch, value) {
    const correct = ["m1998", "m2003", "mchild", "m2026"];
    ch.memory = ch.memory || [];
    if (ch.memory.includes(value)) return;
    ch.memory.push(value);
    if (ch.memory.length < 4) return;
    if (ch.memory.join("|") === correct.join("|")) {
      ch.done = true;
      addLog("四块记忆合拢，左耳小猫的影子和旧照片里的阿花重叠在一起。");
    } else {
      ch.memory = [];
      toast("记忆还没对上。先是阿花，再是离别，再是童年的承诺，最后才是重逢。");
    }
  }

  function handleCare(type) {
    if (!state.started) return;
    if (type === "feed" && !hasItem("第一袋猫粮")) {
      toast("还没有猫粮。第一位客人会带来一袋。");
      return;
    }
    if (type === "bathe" && !hasItem("干洗泡沫")) {
      toast("还没有干洗泡沫。先完成小姑娘的花束订单。");
      return;
    }
    if (type === "play" && !hasItem("羽毛逗猫棒")) {
      toast("猫店长盯着你的手：它在等真正的逗猫棒。");
      return;
    }

    const labels = { pet: "摸摸", feed: "喂猫粮", groom: "梳毛", bathe: "免洗澡", play: "玩逗猫棒" };
    state.cat[type] += 1;
    state.cat.affection += type === "feed" || type === "play" ? 2 : 1;
    if (type === "pet" && state.cat.pet >= 10) {
      unlockEgg("paw10");
      unlockAchievement("摸到第十下");
    }
    if (type === "feed" && state.cat.feed >= 3) unlockEgg("feedBurp");
    if (type === "groom") unlockAchievement("梳毛新手");
    if (type === "play") unlockAchievement("逗猫棒冠军");
    if (type === "bathe") unlockAchievement("干洗泡泡");
    if (state.cat.affection >= 18) unlockAchievement("胖店长养成");

    if (state.chapter === 4) {
      const ch4 = getCh(4);
      if (type === "pet") ch4.pet = true;
      if (type === "feed") ch4.feed = true;
    }

    toast(`猫店长接受了：${labels[type]}。亲密度 +${type === "feed" || type === "play" ? 2 : 1}`);
    saveState();
    render();
  }

  function discoverAllPlants() {
    PLANTS.forEach((plant) => discoverPlant(plant.id));
  }

  function unlockLinkedAchievement(eggId) {
    const map = {
      redString: "风铃红线",
      fishVat: "水缸小鱼",
      backgroundFish: "鱼干背景音",
      oldApron: "旧围裙口袋",
      childhoodMarble: "玻璃弹珠",
      cicadaShell: "蝉壳书签",
      moonWater: "月光浇水",
      rooftopPigeon: "屋顶鸽子",
      paperCrane: "纸鹤留言",
      bicycleBell: "自行车铃"
    };
    if (map[eggId]) unlockAchievement(map[eggId]);
  }

  function openModal(html) {
    $("#modalBody").innerHTML = html;
    $("#modal").classList.remove("hidden");
  }

  function closeModal() {
    $("#modal").classList.add("hidden");
  }

  function renderAchievementModal() {
    return `
      <h3>50 个成就</h3>
      <p class="story-copy">已解锁 ${state.achievements.length} / ${ACHIEVEMENTS.length}。主线会自然解锁大部分，剩下的藏在自由营业的小动作里。</p>
      <div class="achievement-grid">
        ${ACHIEVEMENTS.map((ach) => `<div class="achievement-item ${state.achievements.includes(ach.id) ? "unlocked" : ""}">${state.achievements.includes(ach.id) ? "✓" : "□"} ${escapeHTML(ach.name)}</div>`).join("")}
      </div>`;
  }

  function renderPlantModal() {
    return `
      <h3>32 植物图鉴</h3>
      <p class="story-copy">所有植物都用手绘感 SVG/CSS 呈现，不用文字占位。已点亮 ${state.plants.length} / ${PLANTS.length}。</p>
      <div class="plant-grid">
        ${PLANTS.map((plant) => state.plants.includes(plant.id)
          ? plantCard(plant.id, "noop")
          : `<div class="plant-card"><span class="plant-art" style="filter:grayscale(1);opacity:.48">${plantSVG(plant)}</span><span class="plant-name">未点亮</span><span class="plant-desc">继续营业，猫店长会带你找到它。</span></div>`).join("")}
      </div>`;
  }

  function renderSide() {
    $("#catButton").className = `cat-button ${catStageClass()}`;
    $("#catName").textContent = state.cat.name;
    $("#catStage").textContent = `${stageName()} · 亲密度 ${state.cat.affection}`;
    const percent = progressPercent();
    $("#progressText").textContent = `${percent}%`;
    $("#progressBar").style.width = `${percent}%`;
    $("#plantCount").textContent = `${state.plants.length} / ${PLANTS.length}`;
    $("#achievementCount").textContent = `${state.achievements.length} / ${ACHIEVEMENTS.length}`;
    $("#eggCount").textContent = `${state.eggs.length} / ${TOTAL_EGGS}`;
    $("#storyLog").innerHTML = state.log.length
      ? state.log.slice(-18).reverse().map((item) => `<p>✦ ${escapeHTML(item)}</p>`).join("")
      : `<p>外婆便签会在这里慢慢积起来。</p>`;
    $("#inventory").innerHTML = state.inventory.length
      ? state.inventory.map((item) => `<span>✿ ${escapeHTML(item)}</span>`).join("")
      : `<span>暂时还没有道具</span>`;
  }

  function renderParticles() {
    const host = $("#warmParticles");
    const meteor = isMeteorWindow();
    const count = meteor ? 38 : 22;
    const pieces = [];
    for (let i = 0; i < count; i += 1) {
      const cls = meteor && i % 5 === 0 ? "meteor" : meteor && i % 3 === 0 ? "firefly" : i % 4 === 0 ? "pet" : "";
      pieces.push(`<i class="${cls}" style="left:${Math.random() * 100}%;--delay:${(-Math.random() * 11).toFixed(2)}s;--dur:${(7 + Math.random() * 9).toFixed(2)}s;--drift:${(-40 + Math.random() * 80).toFixed(1)}px"></i>`);
    }
    host.innerHTML = pieces.join("");
    if (state.started && meteor) {
      unlockEgg("meteorEvening");
      unlockAchievement("每日傍晚流星雨");
      unlockAchievement("每日夜光草");
      discoverPlant("liuxingcao");
      saveState();
    }
  }

  function render() {
    $("#startScreen").classList.toggle("hidden", state.started);
    $("#gameScreen").classList.toggle("hidden", !state.started);
    renderParticles();
    if (!state.started) {
      $("#continueBtn").disabled = !localStorage.getItem(SAVE_KEY);
      return;
    }
    $("#chapterTitle").textContent = [
      "空铺初遇", "整理铺面", "首位客人", "午间小憩", "小姑娘的便签", "雨天下单",
      "铲屎官的需求", "深夜寻钥匙", "后院花房", "记忆碎片", "结局选择", "永恒铺面"
    ][state.chapter - 1] || "窗台营业";
    $("#chapterBadge").textContent = `第 ${state.chapter} / ${TOTAL_CHAPTERS} 章`;
    $("#focusText").textContent = focusText();
    renderScene();
    $("#mainPanel").innerHTML = renderChapter();
    renderSide();
  }

  function startNewGame() {
    if (state.started && state.chapter > 1 && !confirm("会覆盖当前本地进度，确定重新开店吗？")) return;
    state = freshState();
    state.started = true;
    addLog("你辞掉 996 工作，回到外婆留下的老社区多肉铺。");
    saveState();
    render();
  }

  function continueGame() {
    state = loadState();
    state.started = true;
    saveState();
    render();
  }

  function resetGame() {
    if (!confirm("确定清除本地存档并重新开店吗？")) return;
    state = freshState();
    localStorage.removeItem(SAVE_KEY);
    render();
  }

  function burstPaws(event) {
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;
    for (let i = 0; i < 6; i += 1) {
      const paw = document.createElement("div");
      paw.className = "paw-burst";
      paw.textContent = "🐾";
      paw.style.left = `${x}px`;
      paw.style.top = `${y}px`;
      paw.style.setProperty("--x", `${-45 + Math.random() * 90}px`);
      paw.style.setProperty("--y", `${-80 - Math.random() * 50}px`);
      document.body.appendChild(paw);
      window.setTimeout(() => paw.remove(), 1100);
    }
  }

  function bindEvents() {
    $("#startBtn").addEventListener("click", startNewGame);
    $("#continueBtn").addEventListener("click", continueGame);
    $("#resetBtn").addEventListener("click", resetGame);
    $("#supportBtn").addEventListener("click", () => window.Paywall?.show({ title: "给猫店长加一颗小鱼干" }));
    $("#supportBtnStart").addEventListener("click", () => window.Paywall?.show({ title: "给猫店长加一颗小鱼干" }));
    $("#modalClose").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", (event) => {
      if (event.target.id === "modal") closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });

    $("#mainPanel").addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      if (action === "noop") return;
      handleAction(action, target.dataset.value, target);
    });

    $("#mainPanel").addEventListener("input", (event) => {
      if (event.target.id === "encourageNote") {
        getCh(5).noteText = event.target.value;
        saveState();
      }
    });

    $$(".cat-actions [data-care]").forEach((button) => {
      button.addEventListener("click", () => handleCare(button.dataset.care));
    });

    $("#catButton").addEventListener("click", (event) => {
      burstPaws(event);
      state.cat.pet += 1;
      state.cat.affection += 1;
      if (state.cat.pet >= 10) unlockEgg("paw10");
      if (state.cat.pet >= 10) unlockAchievement("摸到第十下");
      if (state.cat.affection >= 18) unlockAchievement("胖店长养成");
      saveState();
      renderSide();
    });

    $("#catButton").addEventListener("contextmenu", (event) => {
      event.preventDefault();
      state.cat.ear += 1;
      if (state.cat.ear >= 3) {
        unlockEgg("leftEarVoice");
        unlockAchievement("左耳的秘密");
      } else {
        toast("你轻轻碰了碰左耳缺角。小三花没有躲，只是眨了眨眼。");
      }
      saveState();
      renderSide();
    });

    $("#coverCat").addEventListener("click", (event) => {
      burstPaws(event);
      state.ui.coverCat += 1;
      toast("桃蛋后面的小猫眨了一下眼。");
      saveState();
    });
  }

  bindEvents();
  render();

  window.ShopDebug = {
    getState: () => structuredClone(state),
    setChapter(chapter) {
      state.started = true;
      state.chapter = Math.max(1, Math.min(TOTAL_CHAPTERS, Number(chapter) || 1));
      saveState();
      render();
    },
    markPaid: () => window.Paywall?.markPaid(),
    forceMeteor() {
      state.ui.forceMeteor = true;
      saveState();
      render();
    },
    discoverAll() {
      discoverAllPlants();
      ACHIEVEMENTS.forEach((ach) => uniquePush(state.achievements, ach.id));
      Object.keys(EGG_NAMES).forEach((id) => uniquePush(state.eggs, id));
      saveState();
      render();
    },
    reset: resetGame
  };
})();
