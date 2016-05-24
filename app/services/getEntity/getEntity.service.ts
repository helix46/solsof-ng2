import {HelperService} from '../../services/helper/helper.service';


export class GetEntityService {

    static instance: GetEntityService;
    static isCreating: Boolean = false;

    constructor() {
        this.EntityId = -1;
        HelperService.logError('constructor HelperService');
        if (!GetEntityService.isCreating) {
            throw new Error("You can't call new in Singleton instances! Call HelperService.getInstance() instead.");
        }
    }

    static getInstance() {
        if (GetEntityService.instance == null) {
            GetEntityService.isCreating = true;
            GetEntityService.instance = new GetEntityService();
            GetEntityService.isCreating = false;
        }

        return GetEntityService.instance;
    }

    private EntityId: number;
    setEntityId(entityId: number) {
        this.EntityId = entityId;
    }
    getEntityId() {
        return this.EntityId;
    }
}
