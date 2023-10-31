document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const btn = document.getElementById("btn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    handleFormSubmit();
  });

  function handleFormSubmit() {
    const nomeCliente = document.getElementById("nome").value;
    const horarioMarcado = document.querySelector(
      'input[name="horario"]:checked'
    );
    const servicosSelecionados = document.querySelectorAll(
      'input[name="servico"]:checked'
    );

    if (!validarCampos(nomeCliente, horarioMarcado, servicosSelecionados)) {
      return;
    }

    const mensagemWhatsApp = construirMensagem(
      nomeCliente,
      horarioMarcado,
      servicosSelecionados
    );
    redirecionarParaWhatsApp(mensagemWhatsApp);
  }

  function validarCampos(nome, horario, servicos) {
    // Adicione as validações necessárias
    if (nome.trim() === "") {
      alert("Por favor, preencha o campo 'Nome'.");
      return false;
    }

    if (!horario) {
      alert("Por favor, selecione um horário.");
      return false;
    }

    if (servicos.length === 0) {
      alert("Por favor, selecione pelo menos um serviço.");
      return false;
    }

    return true;
  }

  function construirMensagem(nome, horario, servicos) {
    const servicosSelecionados = Array.from(servicos).filter(
      (input) => input.checked
    );
    const servicosFormatados = servicosSelecionados
      .map((input) => input.value)
      .join(", ");
    const valorTotal = calcularValorTotal(servicosSelecionados);

    return `Olá, meu nome é ${nome} e gostaria de agendar um horário para ${horario.value} e os serviços selecionados são: ${servicosFormatados}. Valor Total: R$ ${valorTotal}.`;
  }

  function calcularValorTotal(servicosSelecionados) {
    let total = 0;
    for (const servico of servicosSelecionados) {
      switch (servico.value) {
        case "Corte com máquina":
          total += 25;
          break;
        case "Corte com tesoura":
          total += 28;
          break;
        case "Barba":
          total += 15;
          break;
        case "Sombrancelha":
          total += 10;
          break;
      }
    }
    return total;
  }

  function redirecionarParaWhatsApp(mensagem) {
    const numeroTelefoneBarbearia = "27999742113"; // Substitua pelo número real
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefoneBarbearia}&text=${encodeURIComponent(
      mensagem
    )}`;
    window.location.href = linkWhatsApp;
  }
});
