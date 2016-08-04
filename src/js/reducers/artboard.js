import { RECEIVE_PROJECT, SET_ACTIVE_ARTBOARD } from '../actions/project';
import { CLICK_ARTBOARD_LAYER } from '../actions/artboard';

const initialState = {
    artboards: {},
    url: null,
    activeArtboard: {
        layer: [],
    },
    isExportEveryLayer: null,
    layer: {
        x: 0,
        y: 0,
    }
};

const getFirstArtboardId = (artboard) => {
    let firstId;

    for (const key in artboard) {
        firstId = artboard[key].id;
        break;
    }

    return firstId;
};

const artboard = (state = initialState, action = {}) => {
    switch (action.type) {
        case RECEIVE_PROJECT:
        {
            const activeArtboard = action.project.artboard[getFirstArtboardId(action.project.artboard)];

            return Object.assign({}, state, {
                artboards: action.project.artboard,
                url: action.url,
                isExportEveryLayer: action.project.exportEveryLayer || null,
                activeArtboard: activeArtboard,
                layer: {
                    x: activeArtboard.x,
                    y: activeArtboard.y,
                    width: activeArtboard.width,
                    height: activeArtboard.height
                }
            });
        }

        case SET_ACTIVE_ARTBOARD:
        {
            const activeArtboard = state.artboards[action.artboardId];

            return Object.assign({}, state, {
                activeArtboard: state.artboards[action.artboardId],
                layer: {
                    x: activeArtboard.x,
                    y: activeArtboard.y,
                    width: activeArtboard.width,
                    height: activeArtboard.height
                }
            });
        }
        case CLICK_ARTBOARD_LAYER:
            return Object.assign({}, state, {
                layer: action.layer,
            });
        default:
            return state;
    }
};

export default artboard;
