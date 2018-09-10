"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular_1 = require("@ionic/angular");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var tabs_router_module_1 = require("./tabs.router.module");
var tabs_page_1 = require("./tabs.page");
var home_module_1 = require("../../main/home/home.module");
var about_module_1 = require("../../main/about/about.module");
var contact_module_1 = require("../../main/contact/contact.module");
var TabsPageModule = /** @class */ (function () {
    function TabsPageModule() {
    }
    TabsPageModule = __decorate([
        core_1.NgModule({
            imports: [
                angular_1.IonicModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                tabs_router_module_1.TabsPageRoutingModule,
                home_module_1.HomePageModule,
                about_module_1.AboutPageModule,
                contact_module_1.ContactPageModule
            ],
            declarations: [tabs_page_1.TabsPage]
        })
    ], TabsPageModule);
    return TabsPageModule;
}());
exports.TabsPageModule = TabsPageModule;
//# sourceMappingURL=tabs.module.js.map