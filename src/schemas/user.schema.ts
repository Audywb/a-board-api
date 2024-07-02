import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Users {
    @Prop({ required: true })
    username: string;

    @Prop()
    create_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);