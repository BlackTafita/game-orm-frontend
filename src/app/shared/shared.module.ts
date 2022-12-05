import { NgModule } from "@angular/core";
import { TagsService } from "./services/tags.service";
import { ThemesService } from "./services/themes.service";


const services = [
    TagsService,
    ThemesService,
];
@NgModule({
    imports: [

    ],
    exports: [
    ],
    providers: [
        ...services,
    ],
})
export class SharedModule {}