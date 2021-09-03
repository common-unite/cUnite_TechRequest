/**
 * Created by bob on 2019-02-16.
 */
({
    doInit : function (cmp,event,helper) {
        let recordId = cmp.get('v.recordId');
        let sObjectName = cmp.get('v.sObjectName');

        /*let utilityAPI = cmp.find("utilitybar");
        if(utilityAPI) utilityAPI.minimizeUtility();*/

        const path = location.pathname || '/';

        if(!recordId || !sObjectName) {
            const pathValues = path.split('/');
            if(pathValues.length >= 5) {
                const pathId = pathValues[4];
                if(pathId.length == 18) {
                    recordId = pathId;
                    sObjectName = pathValues[3];
                }
            }
        }

        try {
            let createRecordEvent = $A.get("e.force:createRecord");
            createRecordEvent.setParams({
                "entityApiName": "Technical_Request__c",
                "defaultFieldValues": {
                    'Object_Type__c' : sObjectName,
                    'RelatedRecordId__c' : recordId,
                    'Example_URL__c' : path
                }
            });
            createRecordEvent.fire();
            cmp.destroy();
        } catch (e) {
            $A.get("e.force:closeQuickAction").fire();

            throw new AuraHandledException('Darn it! Something went wrong: '
                + e.getMessage());
        }


    }

})