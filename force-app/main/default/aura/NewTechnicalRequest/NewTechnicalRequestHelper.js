/**
 * Created by bob on 2019-02-16.
 */
({
    SaveCallBack : function (cmp, event) {
        let id = cmp.get('v.recordId');

        cmp.find("navigation").navigate({
                "type" : "standard__recordPage",
                "attributes": {
                    "recordId"      : id,
                    "actionName"    : "view"   //clone, edit, view
                }
            }, true);
    }
})