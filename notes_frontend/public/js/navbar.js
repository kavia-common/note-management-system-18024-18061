/**
 * PUBLIC_INTERFACE
 * Client-side behavior for the top navigation bar:
 * - Logout button clears stored auth and redirects to /login
 * - Search input debounces and dispatches a global 'notes:search' event and updates URL
 */
(function () {
  function appLogout() {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    } catch (e) {
      // Swallow but not empty; optionally log to console for debugging
      console.warn('Failed to clear auth storage:', e);
    }
  }

  function init() {
    const root = document.querySelector('[data-nav-root]');
    if (!root) return;

    const logoutBtn = root.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        appLogout();
        window.location.href = '/login';
      });
    }

    const search = root.querySelector('#global-search');
    if (search) {
      let t;
      search.addEventListener('input', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          const q = search.value || '';
          const url = new URL(window.location.href);
          if (q) url.searchParams.set('q', q);
          else url.searchParams.delete('q');
          window.history.replaceState({}, '', url.toString());
          document.dispatchEvent(new CustomEvent('notes:search', { detail: q }));
        }, 250);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
