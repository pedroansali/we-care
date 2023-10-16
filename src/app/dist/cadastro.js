document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os botões de seleção
    var botoesSelecao = document.querySelectorAll('.bloco02-selecao-botao');

    // Seleciona todos os campos de entrada
    var campos = document.querySelectorAll('.cadastro-campo');

    // Função para mostrar todos os campos
    function mostrarCampos() {
        campos.forEach(function(campo) {
            campo.style.display = 'block';
        });
    }

    // Função para esconder o campo CRP
    function esconderCRP() {
        document.getElementById('crp').style.display = 'none';
    }

    // Evento de clique nos botões de seleção
    botoesSelecao.forEach(function(botao) {
        botao.addEventListener('click', function(event) {
            event.preventDefault();

            // Resetar a exibição de todos os campos
            campos.forEach(function(campo) {
                campo.style.display = 'block';
            });

            // Esconder o campo CRP se o botão "Paciente" for clicado
            if (botao.textContent.trim() === 'Paciente') {
                esconderCRP();
            }
        });
    });
});
