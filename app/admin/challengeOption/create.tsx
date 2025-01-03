import { SimpleForm, Create, required, TextInput, ReferenceInput,  BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput 
                    source="text" 
                    validate={[required()]} 
                    label="Question" />
                
                <BooleanInput
                source="correct"
                label="Correct Option"
                    />
                    <ReferenceInput
                        source="challengeId"
                        reference="challengeId" 
                        />
               <TextInput
                source="imageSrc"
                label="Image URL"
                />
                    <TextInput
                source="audioSrc"
                label="Audio URL"
                />
            </SimpleForm>
        </Create>
    );
};