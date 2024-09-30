// global
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "data-distribution",
  templateUrl: "./component.html",
  providers: [],
  styleUrls: ["./component.scss"]
})
export class DataDistributionComponent implements OnInit, AfterViewInit {

  widgetModel: object = {
    singleSlider: {
      isFrozen: false,
      model: {
        value: 25,
        provenance: {}
      },
      config: { floor: 0, ceil: 100, showTicks: true, tickStep: 5 },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    },
    rangeSlider: {
      config: { floor: 0, ceil: 250, showTicks: true, tickStep: 15 },
      isFrozen: false,
      model: {
        value: 75,
        highValue: 180,
        provenance: {}
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    },
    singleSelectDropdown: {
      isFrozen: false,
      model: {
        options: [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
        ],
        value: { name: 'London', code: 'LDN' },
        provenance: {}
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    },
    multiSelectDropdown: {
      isFrozen: false,
      model: {
        options: [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
        ],
        value: [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }],
        provenance: {}
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    },
    checkboxGroup: {
      isFrozen: false,
      model: {
        options: [
          { label: 'New York', value: 'NY' },
          { label: 'Rome', value: 'RM' },
          { label: 'London', value: 'LDN' },
          { label: 'Istanbul', value: 'IST' },
          { label: 'Paris', value: 'PRS' }
        ],
        value: ['NY', 'LDN', 'RM'],
        provenance: {}
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    },
    radioButtonGroup: {
      isFrozen: false,
      model: {
        options: [
          { label: 'New York', value: 'NY' },
          { label: 'Rome', value: 'RM' },
          { label: 'London', value: 'LDN' },
          { label: 'Istanbul', value: 'IST' },
          { label: 'Paris', value: 'PRS' }
        ],
        value: undefined,
        provenance: {}
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    },
    inputText: {
      isFrozen: false,
      model: {
        value: "Atlanta",
        provenance: {}
      },
      mode: {
        options: [{ label: "Interaction", value: "interaction" }, { label: "Time", value: "time" }],
        value: "time"
      }
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  widgetUpdated(model, widget) {
    console.log(widget, this.widgetModel[widget]['model']['provenance']);
  }

  ngAfterViewInit(): void { 
    let context = this;

    context.widgetModel['singleSlider']['model']['provenance'] = {
      revalidate: true,
      "data": [
        {
          "value": [
            25
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            14
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            24
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        ,
        {
          "value": [
            34
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            44
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            49
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            54
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            20
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            35
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            45
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            40
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            50
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            45
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            40
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            30
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            40
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            10
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            20
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            25
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            35
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            30
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            30
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            30
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            35
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            25
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            20
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            65
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            100
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            0
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            19,
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            11,
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            29,
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            39,
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            80
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    }
    context.widgetModel['singleSlider']['isFrozen'] = true;

    context.widgetModel['rangeSlider']['model']['provenance'] = {
      revalidate: true,
      "data": [
        {
          "value": [
            105,
            180
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            135,
            180
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        ,
        {
          "value": [
            0,
            180
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            135,
            210
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            135,
            210
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            210,
            250
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
        ,
        {
          "value": [
            45,
            125
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    };
    context.widgetModel['rangeSlider']['isFrozen'] = true;

    context.widgetModel['singleSelectDropdown']['model']['provenance'] = {
      revalidate: true,
      "selections": [
        {
          "value": [
            "NY"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "IST"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    };
    context.widgetModel['singleSelectDropdown']['isFrozen'] = true;

    context.widgetModel['multiSelectDropdown']['model']['provenance'] = {
      revalidate: true,
      "selections": [
        {
          "value": [
            "NY",
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY",
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "PRS"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "IST",
            "PRS"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY",
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    };
    context.widgetModel['multiSelectDropdown']['isFrozen'] = true;

    context.widgetModel['checkboxGroup']['model']['provenance'] = {
      revalidate: true,
      "selections": [
        {
          "value": [
            "NY",
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY",
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY",
            "LDN",
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    };
    context.widgetModel['checkboxGroup']['isFrozen'] = true;

    context.widgetModel['radioButtonGroup']['model']['provenance'] = {
      revalidate: true,
      "selections": [
        {
          "value": [
            "PRS"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "NY"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "RM"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "IST"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": [
            "LDN"
          ],
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    };
    context.widgetModel['radioButtonGroup']['isFrozen'] = true;

    context.widgetModel['inputText']['model']['provenance'] = {
      revalidate: true,
      "data": [
        {
          "value": null,
          "timestamp": new Date() // Currently, the inputText throws some errors when the timestamps of all manually supplied provenance data are the same. This is unlike other widgets, which seem to handle the same provenance timestamps for all datapoints. Thus, until this widget is also fixed, and to ensure that the legit options have similar color, we add a null value with the current timestamp.
        },
        {
          "value": "Rome",
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": "New York",
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": "Rome",
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        },
        {
          "value": "Atlanta",
          "timestamp": new Date("2024-03-05T00:00:00.000Z")
        }
      ]
    };
    context.widgetModel['inputText']['isFrozen'] = true;

    // Detect changes
    context.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    let context = this;
    context.changeDetectorRef.detectChanges();
  }
}