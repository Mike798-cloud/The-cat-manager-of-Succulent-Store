/**
 * 《窗台多肉铺的猫店长》1元支持弹窗
 * 延续旧作的纯前端 localStorage/sessionStorage/cookie 标记方案。
 */

const Paywall = {
  STORAGE_KEY: "_abc_studio_support_maodianzhang",
  SESSION_KEY: "_abc_studio_session_maodianzhang",
  COOKIE_KEY: "_abc_pay_flag_maodianzhang",

  hasPaid() {
    return Boolean(
      localStorage.getItem(this.STORAGE_KEY) ||
      sessionStorage.getItem(this.SESSION_KEY) ||
      this._getCookie(this.COOKIE_KEY)
    );
  },

  markPaid() {
    const token = this._generateToken();
    localStorage.setItem(this.STORAGE_KEY, token);
    sessionStorage.setItem(this.SESSION_KEY, token);
    this._setCookie(this.COOKIE_KEY, token, 365);
  },

  show(config = {}) {
    if (this.hasPaid()) return;
    const overlay = document.getElementById("paywall-overlay");
    if (overlay) {
      overlay.style.display = "flex";
      overlay.classList.remove("paywall-closing");
      requestAnimationFrame(() => overlay.classList.add("paywall-show"));
      return;
    }
    this._createOverlay(config);
  },

  hide() {
    const overlay = document.getElementById("paywall-overlay");
    if (!overlay) return;
    overlay.classList.add("paywall-closing");
    overlay.classList.remove("paywall-show");
    window.setTimeout(() => {
      overlay.style.display = "none";
      overlay.classList.remove("paywall-closing");
    }, 320);
  },

  _onSupport() {
    this.markPaid();
    this.hide();
    this._showThanks();
  },

  _showThanks() {
    const toast = document.createElement("div");
    toast.className = "paywall-toast";
    toast.textContent = "猫店长收到了小鱼干：谢谢你，今天的窗台也更亮啦。";
    document.body.appendChild(toast);
    window.setTimeout(() => toast.classList.add("show"), 40);
    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 360);
    }, 3000);
  },

  _createOverlay(config) {
    const cfg = Object.assign({
      qrCode: "paycode.png",
      price: "1元",
      title: "给猫店长加一颗小鱼干",
      studio: "abc studio"
    }, config);

    const html = `
      <div class="paywall-overlay" id="paywall-overlay" role="dialog" aria-modal="true" aria-label="${cfg.title}">
        <div class="paywall-card">
          <button class="paywall-close" onclick="Paywall.hide()" title="关闭">&times;</button>
          <div class="paywall-card-inner">
            <div class="paywall-header">
              <div class="paywall-title-row">
                <span class="paywall-heart">♡</span>
                <span class="paywall-title">${cfg.title}</span>
                <span class="paywall-heart">♡</span>
              </div>
              <div class="paywall-subtitle">${cfg.price} 支持 · 继续营业 · 感谢每一位路过窗台的人</div>
            </div>

            <div class="paywall-body">
              <div class="paywall-qr-wrapper">
                <img src="${cfg.qrCode}" alt="1元支持收款码" class="paywall-qr-img" />
                <div class="paywall-qr-glow"></div>
              </div>
              <div class="paywall-qr-tip">请用 <strong>某宝</strong> 扫码支持 ${cfg.price}</div>

              <div class="paywall-message">
                <p class="paywall-msg-warm">你好，我是 abc studio 的独立开发者。</p>
                <p class="paywall-msg-body">
                  这间多肉铺里的每一盆花、每一次猫爪提示、每一段外婆便签，都是一点点搭起来的。<br>
                  如果你愿意用 <strong>1元</strong> 支持这部作品，就像给猫店长添了一颗小鱼干。
                </p>
                <p class="paywall-msg-cute">它不会拦着你太久，只会蹭蹭你的裤脚，然后继续陪你解谜。</p>
                <p class="paywall-msg-warm2">完成支持后点击下方按钮，本浏览器会记住你的支持状态。</p>
              </div>
            </div>

            <div class="paywall-footer">
              <div class="paywall-hint">
                <span class="paywall-hint-icon">💡</span>
                <span>小提示：如果清除浏览器数据，下次打开可能会再次出现支持提示。</span>
              </div>
              <div class="paywall-btns">
                <button class="paywall-btn paywall-btn-support" onclick="Paywall._onSupport()">已完成支持 ♡</button>
                <button class="paywall-btn paywall-btn-later" onclick="Paywall.hide()">稍后再说</button>
              </div>
            </div>

            <div class="paywall-studio">${cfg.studio}</div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", html);
    requestAnimationFrame(() => {
      const overlay = document.getElementById("paywall-overlay");
      if (overlay) overlay.classList.add("paywall-show");
    });
  },

  _generateToken() {
    const ts = Date.now();
    const rand = Math.random().toString(36).slice(2, 10);
    return btoa(`${ts}_${rand}_maodianzhang_abc_studio`);
  },

  _setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  },

  _getCookie(name) {
    const prefix = `${name}=`;
    return document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix))
      ?.slice(prefix.length) || "";
  }
};

window.Paywall = Paywall;
