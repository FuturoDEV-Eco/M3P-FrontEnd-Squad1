import { createContext, useEffect, useState } from "react";

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    getUsuarios();
  }, []);

  function getUsuarios() {
    fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((dados) => setUsuarios(dados))
      .catch((error) => console.error(error));
  }

  function cadastrarUsuario(usuario) {
    if (usuario) {
      fetch(`http://localhost:3000/usuarios?cpf=${usuario.cpf}`)
        .then((res) => res.json())
        .then((usuarioExistente) => {
          // Se não existir usuário com o mesmo CPF, cadastrar
          if (!usuarioExistente.length) {
            fetch("http://localhost:3000/usuarios", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(usuario)
            })
              .then(() => {
                console.log("Usuário cadastrado com sucesso");
                getUsuarios();
              })
              .catch((error) => {
                console.log("Erro ao cadastrar usuário", error);
              });
          } else {
            console.log("Usuário com este CPF já está cadastrado");
          }
        })
        .catch((error) => {
          console.log("Erro ao buscar usuários", error);
        });
    } else {
      console.log("Dados do usuário inválidos");
    }
  }

  function deletarUsuario(id) {
    fetch(`http://localhost:3000/locaisColeta?usuarioId=${id}`)
      .then((res) => res.json())
      .then((pontosColeta) => {
        // Se não houver pontos de coleta vinculados ao usuário, então deletar o usuário
        if (!pontosColeta.length) {
          fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
          })
            .then(() => {
              console.log("Usuário deletado com sucesso");
              getUsuarios();
            })
            .catch((error) => {
              console.log("Erro ao deletar usuário", error);
            });
        } else {
          console.log(
            "Usuário possui pontos de coleta vinculados e não pode ser deletado"
          );
        }
      })
      .catch((error) => {
        console.log("Erro ao buscar pontos de coleta", error);
      });
  }

  async function login(email, senha) {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const dados = await response.json();

      let usuarioExiste = false;

      dados.map((usuario) => {
        if (usuario.email === email) {
          usuarioExiste = true;
          if (usuario.senha === senha) {
            localStorage.setItem("isAutenticado", true);
            alert("Usuário logado com sucesso");
            window.location.href = "/";
            return;
          }
          alert("Senha incorreta");
          return;
        }
      });
      if (!usuarioExiste) {
        alert("Não existe usuário com este email");
      }
    } catch (error) {
      console.error("Erro na tentativa de login", error);
    }
  }

  return (
    <UsuariosContext.Provider
      value={{ usuarios, cadastrarUsuario, deletarUsuario, login }}>
      {children}
    </UsuariosContext.Provider>
  );
};
