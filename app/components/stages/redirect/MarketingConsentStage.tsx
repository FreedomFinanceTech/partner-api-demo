'use client';

import {RedirectMarketingConsentPayload, useRedirectStageStore} from '@/app/state/stages';
import React, {useEffect, useState} from 'react';
import {createInputFields, Field, getPossibleValues, InputType} from '../../InputField';
import {StageForm} from './StageForm';
import {YesNoValue} from "@/app/state/enum/Common";

const MarketingConsentStage = () => {

    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const savedEmailOptIn = useRedirectStageStore((state) => state.marketingConsentPayload?.email_opt_in);
    const savedTextOptIn = useRedirectStageStore((state) => state.marketingConsentPayload?.text_opt_in);

    const setCurrentStage = useRedirectStageStore((state) => state.setCurrentStage)
    const setPayload = useRedirectStageStore((state) => state.setMarketingConsentPayload)

    const [formData, setFormData] = useState<RedirectMarketingConsentPayload>({
        email_opt_in: savedEmailOptIn ?? YesNoValue.Yes,
        text_opt_in: savedTextOptIn ?? YesNoValue.Yes
    })

    const fields: Field[] = [
        {
            name: "email_opt_in",
            title: "Opt into email marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
        {
            name: "text_opt_in",
            title: "Opt into SMS marketing",
            type: InputType.Enum,
            possibleValues: getPossibleValues(YesNoValue)
        },
    ]

    const [errors, setErrors] = useState({} as any);

    const validate = (formData: RedirectMarketingConsentPayload) => {
        const formErrors = {} as any

        return formErrors
    }

    const [isSubmitted, setIsSubmitted] = useState(false)

    const submitFormData = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setErrors(validate(formData))
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitted) {
            setCurrentStage(savedStage + 1)
        }
        setPayload({...formData})
    }, [formData, isSubmitted, errors])


    const inputFields = createInputFields(fields, formData, errors, setFormData)

    return (
        <StageForm title={"Marketing Consent"} canGoBack={true} inputFields={inputFields}
                   submitFormData={submitFormData}/>
    )
}
export default MarketingConsentStage
