/* script.js - organizado e com comentários para estudo */
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    // todos os botões de filtro (topo e sidebar têm a mesma classe)
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    // todas as tarefas
    const tasks = Array.from(document.querySelectorAll('.task'));

    /* ---- Função: alterna sidebar aberta / fechada ---- */
    function toggleSidebar() {
        const collapsed = sidebar.classList.toggle('collapsed'); // adiciona/remove classe
        // atualiza atributos ARIA para acessibilidade
        sidebar.setAttribute('aria-expanded', String(!collapsed));
        toggleBtn.setAttribute('aria-expanded', String(!collapsed));
        toggleBtn.setAttribute('aria-label', collapsed ? 'Abrir menu' : 'Fechar menu');
        // muda o ícone visual do botão (<< / >>)
        toggleBtn.textContent = collapsed ? '›' : '‹';
    }

    /* ---- Função: filtra tarefas por categoria ----
       category: 'all' | 'a' | 'b' | 'c' | 'd'
    */
    function filterTasks(category) {
        // mostra/oculta tarefas baseando-se no data-category
        tasks.forEach(task => {
            const taskCat = task.dataset.category; // pega o valor do atributo data-category
            if (category === 'all' || taskCat === category) {
                task.classList.remove('hidden');
            } else {
                task.classList.add('hidden');
            }
        });

        // ativa/desativa visualmente o botão correspondente
        setActiveButton(category);
    }

    /* ---- Função: aplica aparência "ativo" no botão escolhido ---- */
    function setActiveButton(category) {
        filterButtons.forEach(btn => {
            const btnCat = btn.dataset.category;
            const isActive = (btnCat === category);
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    /* ---- Eventos ---- */
    toggleBtn.addEventListener('click', toggleSidebar);

    // adiciona listener a cada botão de filtro
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category || 'all';
            filterTasks(cat);
        });
    });

    // inicialização: garante que "TODOS" esteja ativo ao carregar
    setActiveButton('all');
});
