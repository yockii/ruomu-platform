import {PaginateCondition} from "@/types/common.ts";

export type Module = PaginateCondition & {
    id?: string;
    name?: string;
    code?: string;
    cmd?: string;
    status?: number;
}

export type ModuleDependency = {
    id?: string;
    moduleCode?: string;
    dependencyCode?: string;
}

export type ModuleInjectInfo = PaginateCondition & {
    id?: string;
    moduleId?: string;
    name?: string;
    type?: number;
    injectCode?: string;
    authorizationCode?: string;
}

export type ModuleSettings = {
    id?: string;
    moduleId?: string;
    code?: string;
    value?: string;
}