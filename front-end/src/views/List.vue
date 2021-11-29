<template>
  <div class="container mt-2">
    <b-form inline class="mb-2">
      <b-form-input
        v-model="filter.subject"
        id="subject"
        placeholder="DeD"
        class="mr-2"
        autocomplete="off"
      ></b-form-input>

      <b-form-select
        v-model="filter.status"
        :options="optionsList"
        class="mr-2"
      ></b-form-select>

      <b-button
        variant="outline-secondary"
        @click="filterTasks"
        class="mr-2"
        v-b-tooltip.hover
        title="Buscar"
        ><i class="fas fa-search"></i
      ></b-button>

      <b-button
        variant="outline-secondary"
        @click="clearFilter"
        class="mr-2"
        v-b-tooltip.hover
        title="Limpar filtro"
        ><i class="fas fa-times"></i
      ></b-button>
    </b-form>

    <template v-if="isLoading">
      <div class="loading-spin">
        <b-spinner style="width: 5rem; height: 5rem"></b-spinner>
      </div>
    </template>
    <template v-if="isTasksEmpty && !isLoading">
      <div class="empty-data mt-2">
        <img src="../assets/images/empty-data.svg" class="empty-data-image" />
        <b-button variant="outline-primary" class="mt-2" size="lg" to="/form">
          Criar Campanha
        </b-button>
      </div>
    </template>
    <template v-if="!isTasksEmpty && !isLoading">
      <div v-for="task in tasks" :key="task.id">
        <b-card class="mb-2" :class="{ 'finished-task': isFinished(task) }">
          <div class="d-flex justify-content-between">
            <b-card-title>{{ task.subject }}</b-card-title>

            <span>
              <b-badge
                :variant="variantOverdue(task.dateOverdue, task.status)"
                >{{ overduePresenter(task.dateOverdue) }}</b-badge
              >
            </span>
          </div>

          <b-card-text>{{ task.description }}</b-card-text>

          <b-button
            variant="outline-secondary"
            class="mr-2"
            @click="updateStatus(task.id, status.FINISHED)"
            v-b-tooltip.hover
            title="Concluir"
          >
            <i class="fas fa-check"></i>
          </b-button>
          <b-button
            variant="outline-secondary"
            class="mr-2"
            @click="updateStatus(task.id, status.ARCHIVED)"
            v-b-tooltip.hover
            title="Arquivar"
          >
            <i class="fas fa-archive"></i>
          </b-button>
          <b-button
            variant="outline-secondary"
            class="mr-2"
            @click="edit(task.id)"
            v-b-tooltip.hover
            title="Editar"
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button
            variant="outline-danger"
            class="mr-2"
            @click="remove(task.id)"
            v-b-tooltip.hover
            title="Excluir"
          >
            <i class="fas fa-times"></i>
          </b-button>
        </b-card>
      </div>
      <ul>
		      {#each $userNames as userName}
			    <li>{userName}</li>
		{/each}
	</ul>
    </template>

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-center">
        Deseja realmente excluir essa tarefa? {{ taskSelected.subject }}
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal">
          Cancelar
        </b-button>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveTask"
        >
          Excluir
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import TasksModel from "@/models/TasksModel";
import Status from "@/valueObjects/status";
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  name: "List",

  mixins: [ToastMixin],

  data() {
    return {
      tasks: [],
      taskSelected: [],
      status: Status,
      filter: {
        subject: null,
        status: null,
      },
      optionsList: [
        { value: null, text: "Selecione alguma campanha" },
        { value: Status.OPEN, text: "Nordica" },
        { value: Status.FINISHED, text: "Grega" },
        { value: Status.ARCHIVED, text: "Egipcia" },
      ],
      isLoading: false,
      statusList: [Status.OPEN, Status.FINISHED],
    };
  },

  async created() {
    this.tasks = await this.getTasks();
  },

  methods: {
    edit(taskId) {
      this.$router.push({ name: "form", params: { taskId } });
    },

    async remove(taskId) {
      this.taskSelected = await TasksModel.find(taskId);
      this.$refs.modalRemove.show();
    },

    hideModal() {
      this.$refs.modalRemove.hide();
    },

    async confirmRemoveTask() {
      this.taskSelected.delete();
      this.tasks = await this.getTasks();
      this.hideModal();
    },

    async updateStatus(taskId, status) {
      let task = await TasksModel.find(taskId);
      task.status = status;
      await task.save();

      this.tasks = await this.getTasks();
      this.showToast(
        "success",
        "Sucesso!",
        "Status da tarefa atualizado com suceso"
      );
    },

    isFinished(task) {
      return task.status === this.status.FINISHED;
    },

    async filterTasks() {
      let filter = { ...this.filter };
      filter = this.clean(filter);
      filter.userId = JSON.parse(localStorage.getItem("authUser")).id;
      this.tasks = await TasksModel.params(filter).get();
    },

    clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    },

    async clearFilter() {
      this.filter = {
        subject: null,
        status: null,
      };
      this.tasks = await this.getTasks();
    },

    overduePresenter(dateOverdue) {
      if (!dateOverdue) {
        return;
      }
      return dateOverdue.split("-").reverse().join("/");
    },

    variantOverdue(dateOverdue, taskStatus) {
      if (!dateOverdue) {
        return "light";
      }

      if (taskStatus === this.status.FINISHED) {
        return "success";
      }

      let dateNow = new Date().toISOString().split("T")[0];
      if (dateOverdue === dateNow) {
        return "warning";
      }

      if (dateOverdue < dateNow) {
        return "danger";
      }

      return "light";
    },

    async getTasks() {
      this.isLoading = true;
      let self = this;
      setTimeout(function () {
        self.isLoading = false;
      }, 3000);
      return await TasksModel.params({
        userId: JSON.parse(localStorage.getItem("authUser")).id,
        status: this.statusList,
      }).get();
    },
  },

  computed: {
    isTasksEmpty() {
      return this.tasks.length === 0;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.empty-data-image {
  width: 300px;
  height: 300px;
}

.finished-task {
  opacity: 0.7;
}

.finished-task > .card-body > h4,
.finished-task > .card-body > p {
  text-decoration: line-through;
}

.loading-spin {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65vh;
}
</style>
