import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Posts {
    @Prop()
    username: string;

    @Prop()
    create_at: Date;

    @Prop()
    community: string;

    @Prop()
    title: string;

    @Prop()
    body: string;
}

export const PostSchema = SchemaFactory.createForClass(Posts);