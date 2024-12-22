import { SimpleForm, required, TextInput, ReferenceInput,  BooleanInput, Edit } from "react-admin";

export const ChallengeOptionEdit = () => {
    return (
        <Edit>
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
        </Edit>
    );
};