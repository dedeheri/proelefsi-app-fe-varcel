import * as other from "../actiontypes/other";

const initialState = {
  show_modal: false,
};

const initialStateMain = {
  slide_topics: false,
  report: {
    modal: false,
    data: "",
    id: "",
  },
};

const initialStateDashboard = {
  delete: {
    modal: false,
    data: "",
    id: "",
  },
};

const initialStateSidebar = {
  sidebar: false,
};

function otherRedux(state = initialState, action) {
  switch (action.type) {
    case other.SHOW_FEEDBACK: {
      return {
        ...state,
        show_modal: action.payload,
      };
    }

    default:
      return state;
  }
}

function slideTopicsRedux(state = initialStateMain, action) {
  switch (action.type) {
    case other.SLIDE_TOPICS: {
      return {
        ...state,
        slide_topics: action.payload,
      };
    }

    default:
      return state;
  }
}

function reportModalRedux(state = initialStateMain, action) {
  switch (action.type) {
    case other.REPORT_MODAL: {
      return {
        ...state,
        report: {
          modal: action.payload,
          data: action.data,
          id: action.id,
        },
      };
    }

    default:
      return state;
  }
}

function reportModalDeleteMainRedux(state = initialStateDashboard, action) {
  switch (action.type) {
    case other.DELETE_ARTICLE_MODAL: {
      return {
        ...state,
        delete: {
          modal: action.modal,
          data: action.data,
          id: action.id,
        },
      };
    }

    default:
      return state;
  }
}

function slideSidebarRedux(state = initialStateSidebar, action) {
  switch (action.type) {
    case other.SLIDE_SIDEBAR: {
      return {
        ...state,
        sidebar: action.sidebar,
      };
    }

    default:
      return state;
  }
}

export {
  otherRedux,
  slideTopicsRedux,
  reportModalRedux,
  reportModalDeleteMainRedux,
  slideSidebarRedux,
};
