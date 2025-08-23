<template>
    <v-card>
        <BackButton/>
        <v-form>
    <v-row>
      <v-col>
        <h2>
          Gestão de funções
        </h2>
        <p>
          Pesquise por um utilizador para gerir a sua função ou veja as listas abaixo.
        </p>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12">
        <v-card class="rounded-lg" flat>
          <v-card-text>
            <v-row align="center" no-gutters>
              <v-col cols="12" md="10">
                <v-text-field
                  v-model="pesquisa"
                  label="Pesquisar por nome ou matrícula..."
                  variant="solo"
                  density="comfortable"
                  hide-details
                  @keydown.enter="buscarUtilizador"
                />
              </v-col>
              <v-col cols="12" md="2" class="text-right mt-2 mt-md-0">
                <v-btn color="#0D47A1" @click="buscarUtilizador" block size="large">
                  Pesquisar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    
    <v-expand-transition>
      <v-row v-if="utilizadorEncontrado">
        <v-col cols="12">
          <v-card class="rounded-lg" color="#0D47A1" theme="dark">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>
                  {{ utilizadorEncontrado.nome }}
                </v-card-title>
                <v-card-subtitle>
                  Matrícula: {{ utilizadorEncontrado.matricula }} • {{ utilizadorEncontrado.funcao }}
                </v-card-subtitle>
                <v-card-actions v-if="utilizadorEncontrado.funcao === 'Coordenador'">
                  <v-btn variant="outlined" size="small" class="ms-2" @click="abrirDialogFuncao(utilizadorEncontrado)">
                    Alterar Função
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="80" rounded="0">
                <v-icon size="50">mdi-account-circle</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-divider class="my-8" />


    <v-row>
      <v-col>
        <h2 class="text-h5 font-weight-bold text-grey-darken-3 mb-4">
          Listas de Funções
        </h2>
        <v-card class="rounded-lg" flat>
          <v-tabs v-model="abaSelecionada" bg-color="transparent" color="#0D47A1">
            <v-tab value="coordenadores">Coordenadores</v-tab>
            <v-tab value="professores">Professores</v-tab>
          </v-tabs>

          <v-window v-model="abaSelecionada">
            <v-window-item value="coordenadores">
              <v-list>
                <v-list-item
                  v-for="usuario in coordenadores"
                  :key="usuario.id"
                  :title="usuario.nome"
                  :subtitle="`Matrícula: ${usuario.matricula}`"
                >
                  <template #append>
                    <v-btn icon="mdi-delete" variant="text" color="grey-lighten-1" @click="abrirDialogExclusao(usuario)" />
                  </template>
                </v-list-item>
              </v-list>
            </v-window-item>

            <v-window-item value="professores">
              <v-list>
                <v-list-item
                  v-for="usuario in professores"
                  :key="usuario.id"
                  :title="usuario.nome"
                  :subtitle="`Matrícula: ${usuario.matricula}`"
                >
                  <template #append>
                    <v-btn icon="mdi-delete" variant="text" color="grey-lighten-1" @click="abrirDialogExclusao(usuario)" />
                  </template>
                </v-list-item>
              </v-list>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>


    <v-dialog v-model="dialogFuncaoAberto" max-width="500px">
      <v-card>
        <v-card-title class="pa-4" style="background-color: #0D47A1; color: white;">
          <span class="text-h5">Alterar Função de {{ usuarioEditado.nome }}</span>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-select
            v-model="usuarioEditado.funcao"
            :items="['Professor']"
            label="Nova Função"
            variant="outlined"
            density="compact"
          />
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="grey-darken-1" variant="text" @click="fecharDialogFuncao">Cancelar</v-btn>
          <v-btn color="#0D47A1" variant="flat" @click="salvarAlteracaoFuncao">Guardar Alterações</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExclusaoAberto" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center pt-4">Tem a certeza que quer apagar este utilizador?</v-card-title>
        <v-card-text class="text-center">
          <strong>{{ usuarioEditado.nome }}</strong> será apagado permanentemente.
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn color="grey-darken-1" variant="text" @click="fecharDialogExclusao">Cancelar</v-btn>
          <v-btn color="red-darken-1" variant="flat" @click="confirmarExclusao">Apagar</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-snackbar v-model="snackbar.visivel" :color="snackbar.cor" :timeout="3000" location="top right">
      {{ snackbar.texto }}
    </v-snackbar>
  </v-form>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const pesquisa = ref('')
const utilizadorEncontrado = ref(null)
const dialogFuncaoAberto = ref(false)
const dialogExclusaoAberto = ref(false)
const abaSelecionada = ref('coordenadores')

const snackbar = ref({
  visivel: false,
  texto: '',
  cor: '',
})

const listaUsuarios = ref([
  { id: 2, nome: 'Ricardo Pereira', email: 'ricardo.p@example.com', funcao: 'Coordenador', matricula: '2025002' },
  { id: 3, nome: 'Mariana Costa', email: 'mariana.costa@example.com', funcao: 'Professor', matricula: '2025003' },
  { id: 4, nome: 'Luís Almeida', email: 'luis.a@example.com', funcao: 'Professor', matricula: '2025004' },
  { id: 5, nome: 'Sofia Santos', email: 'sofia.s@example.com', funcao: 'Coordenador', matricula: '2025005' },
])

const usuarioEditado = ref({})

const coordenadores = computed(() => listaUsuarios.value.filter(u => u.funcao === 'Coordenador'))
const professores = computed(() => listaUsuarios.value.filter(u => u.funcao === 'Professor'))

function buscarUtilizador() {
  const termo = pesquisa.value.toLowerCase()
  const encontrado = listaUsuarios.value.find(u =>
    u.nome.toLowerCase().includes(termo) || u.matricula.includes(termo)
  )

  if (encontrado) {
    utilizadorEncontrado.value = encontrado
  } else {
    utilizadorEncontrado.value = null
    mostrarSnackbar('Nenhum utilizador encontrado.', 'warning')
  }
}

function abrirDialogFuncao(usuario) {
  if (usuario.funcao !== 'Coordenador') {
    mostrarSnackbar('Só é possível alterar a função de Coordenadores.', 'warning')
    return
  }

  usuarioEditado.value = { ...usuario }
  dialogFuncaoAberto.value = true
}

function fecharDialogFuncao() {
  dialogFuncaoAberto.value = false
}

function salvarAlteracaoFuncao() {
  const index = listaUsuarios.value.findIndex(u => u.id === usuarioEditado.value.id)
  if (index > -1) {
    listaUsuarios.value[index].funcao = usuarioEditado.value.funcao

    if (utilizadorEncontrado.value?.id === usuarioEditado.value.id) {
      utilizadorEncontrado.value.funcao = usuarioEditado.value.funcao
    }

    mostrarSnackbar('Função atualizada com sucesso!', '#0D47A1')
  }
  fecharDialogFuncao()
}

function abrirDialogExclusao(usuario) {
  usuarioEditado.value = { ...usuario }
  dialogExclusaoAberto.value = true
}

function fecharDialogExclusao() {
  dialogExclusaoAberto.value = false
}

function confirmarExclusao() {
  const index = listaUsuarios.value.findIndex(u => u.id === usuarioEditado.value.id)
  if (index > -1) {
    const nomeRemovido = listaUsuarios.value[index].nome
    listaUsuarios.value.splice(index, 1)

    if (utilizadorEncontrado.value?.id === usuarioEditado.value.id) {
      utilizadorEncontrado.value = null
    }

    mostrarSnackbar(`Utilizador "${nomeRemovido}" foi apagado.`, 'red-darken-1')
  }
  fecharDialogExclusao()
}

function mostrarSnackbar(texto, cor) {
  snackbar.value = { texto, cor, visivel: true }
}
</script>

<style scoped>
.v-list-item .v-btn {
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
}
.v-list-item:hover .v-btn {
  opacity: 1;
}
</style>