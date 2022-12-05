import { Tag } from "./tags.interface";
import { Theme } from "./theme.interface";

export interface Card {
    id?: number;
    title: string;
    description: string;
    tags: Tag[];
    theme: Theme;
}