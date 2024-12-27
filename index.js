let selecionadoPrato = null
let iconPrato = null
let selecionadoBebida = null
let iconBebida = null
let selecionadoSobremesa = null
let iconSobremesa = null


function selecionarProduto(elem, tipo){
    if(tipo === 'prato'){
        if(selecionadoPrato === null){
            elem.classList.add("pedido-selecionado")
            iconPrato = elem.lastElementChild
            iconPrato.classList.remove("disabled")
            selecionadoPrato = elem
        } else if(selecionadoPrato === elem){
            elem.classList.remove("pedido-selecionado")
            iconPrato.classList.add("disabled")
            selecionadoPrato = null
        }else{
            iconPrato.classList.add("disabled")
            selecionadoPrato.classList.remove("pedido-selecionado")
            selecionadoPrato = elem
            iconPrato = elem.lastElementChild
            elem.classList.add("pedido-selecionado")
            iconPrato.classList.remove("disabled")
        }
    }
    
    if(tipo === 'bebida'){
        if(selecionadoBebida === null){
            elem.classList.add("pedido-selecionado")
            iconBebida = elem.lastElementChild
            iconBebida.classList.remove("disabled")
            selecionadoBebida = elem
        }  else if(selecionadoBebida === elem){
            elem.classList.remove("pedido-selecionado")
            iconBebida.classList.add("disabled")
            selecionadoBebida = null
        }else{
            iconBebida.classList.add("disabled")
            selecionadoBebida.classList.remove("pedido-selecionado")
            selecionadoBebida = elem
            iconBebida = elem.lastElementChild
            elem.classList.add("pedido-selecionado")
            iconBebida.classList.remove("disabled")
        }
    }
    
    if(tipo === 'sobremesa'){
        if(selecionadoSobremesa === null){
            elem.classList.add("pedido-selecionado")
            iconSobremesa = elem.lastElementChild
            iconSobremesa.classList.remove("disabled")
            selecionadoSobremesa = elem
        } else if(selecionadoSobremesa === elem){
            elem.classList.remove("pedido-selecionado")
            iconSobremesa.classList.add("disabled")
            selecionadoSobremesa = null
        } else{
            iconSobremesa.classList.add("disabled")
            selecionadoSobremesa.classList.remove("pedido-selecionado")
            selecionadoSobremesa = elem
            iconSobremesa = elem.lastElementChild
            elem.classList.add("pedido-selecionado")
            iconSobremesa.classList.remove("disabled")
        }
    }    
    ativarBotaoCompra()
}

function ativarBotaoCompra(){
    const btn = document.querySelector(".botao-pedido")
    const telaPedidoConcluido = document.querySelector(".pedido-concluido")
    let mensagemFinal = ''
    if(selecionadoBebida !== null && selecionadoPrato !== null && selecionadoSobremesa !== null){
        const btnConfirmar = document.querySelector(".confirmar")
        const btnCancelar = document.querySelector(".cancelar")
        btn.classList.add("pedido-fechado")
        btn.innerHTML = "Fazer pedido"
        btn.addEventListener("click", function(){
            const definirPrato = document.querySelector("#pedido1")
            const definirBebida = document.querySelector("#pedido2")
            const definirSobremesa = document.querySelector("#pedido3")
            const definirTotal = document.querySelector(".total")
            let valorPrato = (selecionadoPrato.children[3].textContent).slice(3).replace("," , ".")
            let valorBebida = (selecionadoBebida.children[3].textContent).slice(3).replace("," , ".")
            let valorSobremesa = (selecionadoSobremesa.children[3].textContent).slice(3).replace("," , ".")
            
            let total = (parseFloat(valorPrato) + parseFloat(valorBebida) + parseFloat(valorSobremesa)).toFixed(2).replace("." , ",")

            telaPedidoConcluido.classList.remove("disabled")
            definirPrato.innerHTML = `<p>${selecionadoPrato.children[1].textContent}</p>
                <p>${selecionadoPrato.children[3].textContent}</p>`

            definirBebida.innerHTML = `<p>${selecionadoBebida.children[1].textContent}</p>
                <p>${selecionadoBebida.children[3].textContent}</p>`

            definirSobremesa.innerHTML = `<p>${selecionadoSobremesa.children[1].textContent}</p>
                <p>${selecionadoSobremesa.children[3].textContent}</p>`

            definirTotal.innerHTML = `R$ ${total}`

            mensagemFinal = `Seu pedido foi: ${selecionadoPrato.children[1].textContent}, ${selecionadoBebida.children[1].textContent} e ${selecionadoSobremesa.children[1].textContent}. Com total de R$ ${total}. Obrigada!`
        
        })

        btnConfirmar.addEventListener("click", function(){
            window.open(`https://api.whatsapp.com/send?phone=5512996321899&text=${mensagemFinal}`, '_blank');

            })

        btnCancelar.addEventListener("click", function(){
            telaPedidoConcluido.classList.add("disabled")
        })
    } else{
        btn.classList.remove("pedido-fechado")
        btn.innerHTML = "Selecione os 3 itens para fechar o pedido"
    }
}