define({
  root: ({
    _widgetLabel: "Data Aggregation (Beta)",
    startPage: {
      startPageInstructions: "This widget will assist with processing and submitting data from a file to the ${layer} layer in the map",
      startPageHint: "Values within the file must be delimited by comma, tab, semi-colon, or vertical bar.",
      dragDrop: "Please drag and drop",
      browse: "Browse to File",
      or: "OR",
      userPrivilege: "Your account does not have permission to create or modify data.",
      userCredits: "${widgetName} requires credits to use the ${locator} locator.",
      contactAdmin: "Please contact the organization's administrator to request additional credits.",
      contactAdminEdit: "Please contact the organization's administrator to request edit privileges.",
      canUseLocator: "The ${locator} locator will be used to locate features.",
      notEnoughCredits: "Not enough credits.",
      locationAndField: "Location and Field Information",
      locationAndFieldHint: "Choose the values from the file that should be used to update the ${layerName} layer.",
      cannotUseLocator: "Unable to use ${widgetName}",
      noAnonymousEdit: "The ${layerName} layer does not support anonymous editing.",
      pleaseLogin: "Please sign into the ${org} organization or contact the organization's administrator to request anonymous editing be enabled.",
      invalidEdit: "Invalid Privileges",
      unableToAccess: "Unable to access ${layerName}",
      appropriateCredentials: "Verify you have signed in with the appropriate credentials.",
      shared: "Please contact the organization's administrator to request access to the ${layerName} layer."
    },
    mapping: {
      schemaMapping: "Field Information",
      schemaMappingHint: "Please choose fields from the file that correlate to the fields in the layer.",
      locationMapping: "Location Information",
      locationMappingHint: "Please choose the type of address or coordinate information to expect from the file."
    },
    locationMapping: {
      locationMappingPageHint: "Choose location type",
      useAddress: "Locate using an address",
      useAddressHint: "Data contains address information",
      useCoordinates: "Locate using coordinates",
      useCoordinatesHint: "Data contains X/Y coordinate values"
    },
    address: {
      addressPageHint: "Choose address type",
      singleField: "Single field",
      singleFieldHint: "Please choose the field that contains the address information",
      multiField: "Multiple fields",
      multiFieldHint: "Please choose the fields that contain the address information"
    },
    coordinates: {
      coordinatesPageHint: "Please choose the fields that contain the coordinate data"
    },
    fieldMapping: {
      fieldMappingPageHint: "Please choose the source field that maps to the target field",
      sourceField: "Matching Source Field",
      targetField: "Target Field"
    },
    buttons: {
      addToMap: "Add to Map",
      submit: "Submit",
      download: "Download"
    },
    review: {
      matched: "Found",
      reviewMatched: "Locations Found",
      reviewMatchedHint: "Please review locations that were found.",
      unMatched: "not Found",
      reviewUnMatched: "Locations not Found",
      reviewUnMatchedHint: "Please review locations that were not found. Items that are not corrected will not be submitted.",
      duplicate: "Duplicate",
      reviewDuplicate: "Duplicate Locations",
      reviewDuplicateHint: "Please review locations that were already found in the ${layerName} layer. Items that are not addressed will not be submitted.",
      use: "Use:",
      fromLayer: "Target Information",
      target: "Target",
      source: "Source",
      fromFile: "Source Information",
      locationControlHint: "Please review address information",
      duplicateAction: "Choose an action",
      item: "Record:",
      locateFeature: "Locate Feature",
      removeFeature: "Remove Feature",
      featureLocated: "Location Found",
      valuesDoNotMatch: "Does not match existing value",
      sync: "Sync address information with field information",
      noFeaturesSaved: "No features saved successfully",
      someFeaturesSaved: "${num} feature(s) saved successfully.",
      someFeaturesNotSaved: "${num} feature(s) were not saved successfully.",
      feature: "Review Feature Information",
      locationInfo: "Review Location Information",
      selectValue: "Select a Value",
      reviewData: "Review Data",
      reviewDataHint: "Please review your data before submitting to the ${layerName} layer.",
      reviewFeatureHint: "Please review or edit your feature and location information.",
      duplicateModify: "Duplicate, needs change",
      duplicateSave: "Save as a new feature"
    },
    warningsAndErrors: {
      loadWarning: "This widget requires a Feature Service data source. Please configure the widget to define a data source.",
      saveError: "Error saving features.",
      consumesCredits: "This tool consumes credits when used with the ArcGIS Online World Geocoding Service",
      noValue: "Select a field",
      mappingTitle: "",
      locationMappingComplete: "Location Mapping Complete",
      fieldMappingComplete: "Field Mapping Complete",
      settingsCleared: "Settings will be cleared.",
      proceed: "Do you want to proceed?",
      itemMoveMatch: "Item was located and moved to the locations found list",
      itemMoveUnMatched: "Unable to locate item. Moved to the locations not found list.",
      itemWillBeLocated: "Item will be removed from the duplicate locations list.",
      cannotLocate: "Unable to locate item. Please verify the location information.",
      invalidMessage: "Invalid Value.",
      rangeMessage: "Value must be less than ${num} characters.",
      locatorError: "Locator Invalid or Inaccessible.",
      notConfigured: "locator not configured for current locating options",
      noMoreLocators: "no additional locators configured"
    },
    featureToolbar: {
      locate: "Locate",
      save: "Save record",
      cancel: "Cancel edits",
      cancelTitle: "Cancel Edits",
      cancelMessage: "Cancel edits to the current record?"
    }
  }),
  "ar": 0,
  "bs": 0,
  "cs": 0,
  "da": 0,
  "de": 0,
  "el": 0,
  "es": 0,
  "et": 0,
  "fi": 0,
  "fr": 0,
  "he": 0,
  "hi": 0,
  "hr": 0,
  "it": 0,
  "id": 0,
  "ja": 0,
  "ko": 0,
  "lt": 0,
  "lv": 0,
  "nb": 0,
  "nl": 0,
  "pl": 0,
  "pt-br": 0,
  "pt-pt": 0,
  "ro": 0,
  "ru": 0,
  "sl": 0,
  "sr": 0,
  "sv": 0,
  "th": 0,
  "tr": 0,
  "vi": 0,
  "zh-cn": 0,
  "zh-hk": 0,
  "zh-tw": 0
});