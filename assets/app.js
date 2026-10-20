
(() => {
  const menuBtn = document.querySelector('[data-menu]');
  const navLinks = document.querySelector('.navlinks');
  if (menuBtn && navLinks) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

  const toast = (msg) => {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2600);
  };
  window.showToast = toast;

  document.querySelectorAll('[data-scroll]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  const checkout = document.querySelector('[data-checkout]');
  if (checkout) {
    const params = new URLSearchParams(location.search);
    const plans = {
      'pdf-basic': {product:'PDF → Markdown', plan:'个人版', price:29},
      'media-pro': {product:'AI 图片 / 视频处理', plan:'专业版', price:99},
      'insight-team': {product:'潮枢智能 · 运营洞见', plan:'团队版', price:199}
    };
    let key = params.get('plan') || 'pdf-basic';
    let data = plans[key] || plans['pdf-basic'];
    const planSelect = document.querySelector('#plan');
    if (planSelect) {
      planSelect.value = key;
      planSelect.addEventListener('change', () => {
        data = plans[planSelect.value];
        update();
        history.replaceState({},'',`?plan=${encodeURIComponent(planSelect.value)}`);
      });
    }
    const update = () => {
      document.querySelector('[data-product]').textContent = data.product;
      document.querySelector('[data-planname]').textContent = data.plan;
      document.querySelector('[data-price]').textContent = `¥${data.price.toFixed(2)}`;
      document.querySelector('[data-total]').textContent = `¥${data.price.toFixed(2)}`;
    };
    update();
    document.querySelector('[data-pay]')?.addEventListener('click', () => {
      const email = document.querySelector('#email')?.value.trim();
      if (!email) { toast('请先填写接收订单信息的邮箱'); return; }
      toast('支付宝电脑网站支付正在申请开通中');
    });
  }
})();
