// src/data/machines.ts

export const machinesDB = [
  {
    id: "M-001",
    code: "DC-BBL-3PR-004",
    name: "Bambu Lab A1 Combo 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/A1-combo-1.jpg",
      "/images/A1-combo-2.jpg",
      "/images/A1-combo-3.jpg",
      "/images/A1-combo-4.jpg",
      "/images/A1-combo-5.jpg",
      "/images/A1-combo-6.jpg"
    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "A1 Combo", image: "/images/A1-combo-1.jpg", price: "$399", id: "M-001" },
      { name: "A1", image: "/images/A1-1.jpg", price: "$299", id: "M-002" }
    ],
    // 3. Features
    features: [
      "Full-Auto Calibration: Absolutely no manual tuning",
      "Seamless Multi-Color Printing (Combo Version): Experience limitless creativity with AMS-powered material handling.",
      "49dB Whisper-Quiet Operation: Print in peace with a noise level as low as a quiet library.",
      "Best-In-Class Print Quality: Pro-grade precision & surfaces that set the industry standard.",
      "One-Click MakerWorld Integration: Find your next project and start printing instantly.",
      "Full-Scale Build Volume: A spacious 256 × 256 × 256 mm³ canvas for your big ideas.",
      "The upgraded heatbed cable features Kevlar reinforcement, thicker insulation, softer copper, optimized wire winding interval, Nylon sleeving and an extended strain relief.",
      "To connect the A1 printer to the AMS/ AMS 2 Pro/ AMS HT, an AMS HUB (SA013) accessory is needed."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    productVideoId: "https://www.youtube.com/embed/vhBLetZHJK0?si=8J9rUi9Ud6zkJUOG",
    unboxingVideoId: "https://www.youtube.com/embed/43UNZvhyqJk?si=JxFrrXnjTw_1TE2j",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/A1-choo-1.jpg", text: "Multi-color Printing - The most reliable multi-color system" },
      { image: "/images/A1-choo-2.jpg", text: "Full-auto Calibration - You don't have to do ANY manual tuning" },
      { image: "/images/A1-choo-3.jpg", text: "Large Print Volume - Print a helmet in 1-piece" },
      { image: "/images/A1-choo-4.jpg", text: "1-click to Print - As easy as your copier" },
      { image: "/images/A1-choo-5.jpg", text: "Reliable High Speed - Finish your project on time, every time" },
      { image: "/images/A1-choo-6.jpg", text: "Active Flow Control - Smooth surfaces, sharp edges" }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
      {
        category: "Body",
        rows: [
          { label: "Build Volume (W*D*H)", value: "256*256*256 mm³" }
        ]
      },
      {
        category: "Toolhead",
        rows: [
          { label: "Hot End", value: "All-Metal" },
          { label: "Nozzle", value: "Stainless Steel" },
          { label: "Max Hot End Temperature", value: "300 °C" },
          {
            label: "Nozzle Diameter",
            value: `0.4 mm (Included)
    0.2 mm
    0.6 mm
    0.8 mm`
          }
        ]
      },
      {
        category: "Heatbed",
        rows: [
          {
            label: "Build Plate",
            value: `Bambu Textured PEI Plate (Included)
    Bambu Smooth PEI Plate
    Bambu Dual-Texture PEI Plate
    Bambu High Temperature Plate (Smooth PEI)
    Bambu Cool Plate`
          },
          { label: "Max Build Plate Temperature", value: "100°C" }
        ]
      },
      {
        category: "Speed",
        rows: [
          { label: "Max Speed of Tool Head", value: "500 mm/s" },
          { label: "Max Acceleration of Tool Head", value: "10000 mm/s²" }
        ]
      },
      {
        category: "Supported Filament",
        rows: [
          { label: "Supported Materials", value: "PLA, PETG, TPU, PVA" },
          {
            label: "Ideal Materials",
            value: `ABS
    ASA
    PC
    PA
    PET
    Carbon/Glass Fiber Reinforced Polymer`
          }
        ]
      },
      {
        category: "Sensors",
        rows: [
          {
            label: "Chamber Monitoring Camera",
            value: `Low Frame Rate Camera (Up to 1080P)
    Timelapse Supported`
          },
          { label: "Filament Run Out Sensor", value: "Yes" },
          { label: "Filament Odometry", value: "Yes" },
          { label: "Power Loss Recovery", value: "Yes" },
          { label: "Filament Tangle Sensor", value: "Yes" }
        ]
      },
      {
        category: "Physical Dimensions",
        rows: [
          { label: "A1 Dimensions", value: "465*410*430 mm³" },
          { label: "Package Size", value: "596*536*325 mm³" },
          { label: "Net Weight", value: "8.3 kg" },
          { label: "Gross Weight", value: "13 kg" },
          { label: "A1 Combo Package Size", value: "560*540*430 mm³" },
          {
            label: "A1 Combo Gross Weight",
            value: "13.5 kg (AMS Lite Included)"
          }
        ]
      }
    ],
    // 8. What's in the Box
    inTheBox: [
      { name: "Bambu Lab A1 combo", image: "/images/A1-box-1.jpg" },
      { name: "Purge Wiper", image: "/images/A1-box-2.jpg" },
      { name: "Spool Holder", image: "/images/A1-box-3.jpg" },
      { name: "Stainless Steel Nozzle (pre-installed）", image: "/images/A1-box-4.jpg" },
      { name: "PTFE Tube*1", image: "/images/A1-box-5.jpg" },
      { name: "Bambu Filament Samples-20g(Random Color)", image: "/images/A1-box-6.jpg" },
      { name: "Build Plate", image: "/images/A1-box-7.jpg" },
      { name: "AMS lite Body", image: "/images/A1-add-1.jpg" },
      { name: "AMS lite Stand", image: "/images/A1-add-2.jpg" },
      { name: "AMS lite Rotary Spool Holder (x4)", image: "/images/A1-add-3.jpg" },
      { name: "PTFE Tubes", image: "/images/A1-add-4.jpg" }
    ]
  },

  {
    id: "M-002",
    code: "DC-BBL-3PR-003",
    name: "Bambu Lab A1 3D Printer",
    price: "$299",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/A1-1.jpg",
      "/images/A1-combo-2.jpg",
      "/images/A1-combo-3.jpg",
      "/images/A1-combo-4.jpg",
      "/images/A1-combo-5.jpg",
      "/images/A1-combo-6.jpg"
    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "A1 Combo", image: "/images/A1-combo-1.jpg", price: "$399", id: "M-001" },
      { name: "A1", image: "/images/A1-1.jpg", price: "$299", id: "M-002" }
    ],
    // 3. Features
    features: [
      "Full-Auto Calibration: Absolutely no manual tuning",
      "49dB Whisper-Quiet Operation: Print in peace with a noise level as low as a quiet library.",
      "Best-In-Class Print Quality: Pro-grade precision & surfaces that set the industry standard.",
      "One-Click MakerWorld Integration: Find your next project and start printing instantly.",
      "Full-Scale Build Volume: A spacious 256 × 256 × 256 mm³ canvas for your big ideas.",
      "The upgraded heatbed cable features Kevlar reinforcement, thicker insulation, softer copper, optimized wire winding interval, Nylon sleeving and an extended strain relief.",
      "To connect the A1 printer to the AMS/ AMS 2 Pro/ AMS HT, an AMS HUB (SA013) accessory is needed."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    productVideoId: "https://www.youtube.com/embed/vhBLetZHJK0?si=8J9rUi9Ud6zkJUOG",
    unboxingVideoId: "https://www.youtube.com/embed/43UNZvhyqJk?si=JxFrrXnjTw_1TE2j",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/A1-choo-2.jpg", text: "Full-auto Calibration - You don't have to do ANY manual tuning" },
      { image: "/images/A1-choo-3.jpg", text: "Large Print Volume - Print a helmet in 1-piece" },
      { image: "/images/A1-choo-4.jpg", text: "1-click to Print - As easy as your copier" },
      { image: "/images/A1-choo-5.jpg", text: "Reliable High Speed - Finish your project on time, every time" },
      { image: "/images/A1-choo-6.jpg", text: "Active Flow Control - Smooth surfaces, sharp edges" }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
  specs: [
      {
        category: "Body",
        rows: [
          { label: "Build Volume (W*D*H)", value: "256*256*256 mm³" }
        ]
      },
      {
        category: "Toolhead",
        rows: [
          { label: "Hot End", value: "All-Metal" },
          { label: "Nozzle", value: "Stainless Steel" },
          { label: "Max Hot End Temperature", value: "300 °C" },
          {
            label: "Nozzle Diameter",
            value: `0.4 mm (Included)
    0.2 mm
    0.6 mm
    0.8 mm`
          }
        ]
      },
      {
        category: "Heatbed",
        rows: [
          {
            label: "Build Plate",
            value: `Bambu Textured PEI Plate (Included)
    Bambu Smooth PEI Plate
    Bambu Dual-Texture PEI Plate
    Bambu High Temperature Plate (Smooth PEI)
    Bambu Cool Plate`
          },
          { label: "Max Build Plate Temperature", value: "100°C" }
        ]
      },
      {
        category: "Speed",
        rows: [
          { label: "Max Speed of Tool Head", value: "500 mm/s" },
          { label: "Max Acceleration of Tool Head", value: "10000 mm/s²" }
        ]
      },
      {
        category: "Supported Filament",
        rows: [
          { label: "Supported Materials", value: "PLA, PETG, TPU, PVA" },
          {
            label: "Ideal Materials",
            value: `ABS
    ASA
    PC
    PA
    PET
    Carbon/Glass Fiber Reinforced Polymer`
          }
        ]
      },
      {
        category: "Sensors",
        rows: [
          {
            label: "Chamber Monitoring Camera",
            value: `Low Frame Rate Camera (Up to 1080P)
    Timelapse Supported`
          },
          { label: "Filament Run Out Sensor", value: "Yes" },
          { label: "Filament Odometry", value: "Yes" },
          { label: "Power Loss Recovery", value: "Yes" },
          { label: "Filament Tangle Sensor", value: "Yes" }
        ]
      },
      {
        category: "Physical Dimensions",
        rows: [
          { label: "A1 Dimensions", value: "465*410*430 mm³" },
          { label: "Package Size", value: "596*536*325 mm³" },
          { label: "Net Weight", value: "8.3 kg" },
          { label: "Gross Weight", value: "13 kg" },
          { label: "A1 Combo Package Size", value: "560*540*430 mm³" },
          {
            label: "A1 Combo Gross Weight",
            value: "13.5 kg (AMS Lite Included)"
          }
        ]
      }
    ],
    // 8. What's in the Box
    inTheBox: [
      { name: "Bambu Lab A1", image: "/images/A1-box-1.jpg" },
      { name: "Purge Wiper", image: "/images/A1-box-2.jpg" },
      { name: "Spool Holder", image: "/images/A1-box-3.jpg" },
      { name: "Stainless Steel Nozzle (pre-installed）", image: "/images/A1-box-4.jpg" },
      { name: "PTFE Tube*1", image: "/images/A1-box-5.jpg" },
      { name: "Bambu Filament Samples-20g(Random Color)", image: "/images/A1-box-6.jpg" },
      { name: "Build Plate", image: "/images/A1-box-7.jpg" }
    ],

    addOns: [
      { name: "AMS lite Body", image: "/images/A1-add-1.jpg", variant: "A1 Combo" },
      { name: "AMS lite Stand", image: "/images/A1-add-2.jpg", variant: "A1 Combo" },
      { name: "AMS lite Rotary Spool Holder (x4)", image: "/images/A1-add-3.jpg", variant: "A1 Combo" },
      { name: "PTFE Tubes", image: "/images/A1-add-4.jpg", variant: "A1 Combo" },
    ]
  },

  {
    id: "M-003",
    code: "DC-BBL-3PR-001",
    name: "Bambu Lab A1 mini 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/A1-mini-1.jpg",
      "/images/A1-mini-2.jpg",
      "/images/A1-mini-3.jpg",
     
    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "A1 Mini", image: "/images/A1-mini-1.jpg", price: "$399", id: "M-003" },
      { name: "A1 Mini Combo", image: "/images/A1-mini-combo-1.jpg", price: "$299", id: "M-004" }
    ],
    // 3. Features
    features: [
      "Full-Auto Calibration: Absolutely no manual tuning",
      "49dB Whisper-Quiet Operation: Print in peace with a noise level as low as a quiet library.",
      "Best-In-Class Print Quality: Pro-grade precision & surfaces that set the industry standard.",
      "One-Click MakerWorld Integration: Find your next project and start printing instantly.",
      "Compact Footprint: Blends in to your desk setup.",
      "To connect the A1 mini printer to the AMS/ AMS 2 Pro/ AMS HT, an AMS HUB (SA013) accessory is needed."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    productVideoId: "https://www.youtube.com/embed/QVTbHuwVnZc?si=-2nb-_ZNVqvHImMJ",
    unboxingVideoId: "https://www.youtube.com/embed/uhyYlKnhUbM?si=_Zs-sdmIKX6STaYE",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/A1-choo-2.jpg", text: "Full-auto Calibration - You don't have to do ANY manual tuning" },
      { image: "/images/A1-mini-choo-1.jpg", text: "Active Flow Rate Compensation" },
      { image: "/images/A1-mini-choo-2.jpg", text: "Plug-N-Play" },
      { image: "/images/A1-mini-choo-3.jpg", text: "Active Motor Noise Cancelling" },
      { image: "/images/A1-mini-choo-4.jpg", text: "Bed Slinger, with CoreXY Speed And Quality（High-Speed Precision）" },
      { image: "/images/A1-mini-choo-5.jpg", text: "Sync with Bambu Studio and Bambu Handy" }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
  {
    category: "Body",
    rows: [
      { label: "Build Volume (W*D*H)", value: "180*180*180 mm³" }
    ]
  },
  {
    category: "Toolhead",
    rows: [
      { label: "Hot End", value: "All-Metal" },
      { label: "Nozzle", value: "Stainless Steel" },
      { label: "Max Hot End Temperature", value: "300 °C" },
      {
        label: "Nozzle Diameter",
        value: `0.4 mm (Included)
0.2 mm, 0.6 mm, 0.8 mm`
      }
    ]
  },
  {
    category: "Heatbed",
    rows: [
      {
        label: "Build Plate",
        value: `Bambu Textured PEI Plate (Included)
Bambu Smooth PEI Plate`
      },
      { label: "Max Build Plate Temperature", value: "80°C" }
    ]
  },
  {
    category: "Speed",
    rows: [
      { label: "Max Speed of Tool Head", value: "500 mm/s" },
      { label: "Max Acceleration of Tool Head", value: "10000 mm/s²" }
    ]
  },
  {
    category: "Supported Filament",
    rows: [
      { label: "Supported Materials", value: "PLA, PETG, TPU, PVA" },
      {
        label: "Ideal Materials",
        value: `ABS, ASA, PC, PA, PET,
Carbon/Glass Fiber Reinforced Polymer`
      },
      { label: "Not Recommended", value: "-" }
    ]
  },
  {
    category: "Sensors",
    rows: [
      {
        label: "Monitoring Camera",
        value: `Low Framerate Camera (Up to 1080P)
Timelapse Supported`
      },
      { label: "Filament Run Out Sensor", value: "Yes" },
      { label: "Filament Odometry", value: "Yes" },
      { label: "Power Loss Recovery", value: "Yes" },
      { label: "Filament Tangle Sensor", value: "Yes" }
    ]
  },
  {
    category: "Physical Dimensions",
    rows: [
      {
        label: "A1 mini",
        value: "347*315*365 mm³"
      },
      {
        label: "Package Size",
        value: "385*430*460 mm³"
      },
      {
        label: "Net Weight",
        value: "5.5 kg"
      },
      {
        label: "Gross Weight",
        value: "8.2 kg"
      },
      {
        label: "A1 mini Combo Package Size",
        value: "385*430*495 mm³"
      },
      {
        label: "A1 mini Combo Gross Weight",
        value: "10.2 kg (AMS Lite Included)"
      }
    ]
  }
],
    // 8. What's in the Box
    inTheBox: [
      { name: "A1 mini", image: "/images/A1-mini-box-1.jpg" },
      { name: "Spool Holder", image: "/images/A1-mini-box-2.jpg" },
      { name: "Purge Wiper", image: "/images/A1-mini-box-3.jpg" },
      { name: "Build Plate", image: "/images/A1-mini-box-4.jpg" },
      { name: "PTFE Tube*1", image: "/images/A1-mini-box-5.jpg" },
      { name: "Bambu Filament Samples-20g(Random Color)", image: "/images/A1-mini-box-6.jpg" },
      { name: "Stainless Steel Nozzle（Included）", image: "/images/A1-mini-box-7.jpg" },
      { name: "Accessory Box", image: "/images/A1-mini-box-8.jpg" }

    ],

    addOns: [
      { name: "AMS lite Stand", image: "/images/A1-mini-add-1.jpg", variant: "A1 Mini Combo" },
      { name: "AMS lite Body", image: "/images/A1-mini-add-2.jpg", variant: "A1 Mini Combo" },
      { name: "AMS lite Rotary Spool Holder (x4)", image: "/images/A1-mini-add-3.jpg", variant: "A1 Mini Combo" },
      { name: "PTFE Tube*3", image: "/images/A1-mini-add-4.jpg", variant: "A1 Mini Combo" },
    ]
  },

  {
    id: "M-004",
    code: "DC-BBL-3PR-002",
    name: "Bambu Lab A1 mini Combo 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/A1-mini-combo-1.jpg",
      "/images/A1-mini-combo-2.jpg",
      "/images/A1-mini-1.jpg",
      "/images/A1-mini-2.jpg",
      "/images/A1-mini-3.jpg"
    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "A1 Mini", image: "/images/A1-mini-1.jpg", price: "$399", id: "M-003" },
      { name: "A1 Mini Combo", image: "/images/A1-mini-combo-1.jpg", price: "$299", id: "M-004" }
    ],
    // 3. Features
    features: [
      "Full-Auto Calibration: Absolutely no manual tuning",
      "Seamless Multi-Color Printing (Combo Version): Experience limitless creativity with AMS-powered material handling.",
      "49dB Whisper-Quiet Operation: Print in peace with a noise level as low as a quiet library.",
      "Best-In-Class Print Quality: Pro-grade precision & surfaces that set the industry standard.",
      "One-Click MakerWorld Integration: Find your next project and start printing instantly.",
      "Compact Footprint: Blends in to your desk setup.",
      "To connect the A1 mini printer to the AMS/ AMS 2 Pro/ AMS HT, an AMS HUB (SA013) accessory is needed."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    productVideoId: "https://www.youtube.com/embed/QVTbHuwVnZc?si=-2nb-_ZNVqvHImMJ",
    unboxingVideoId: "https://www.youtube.com/embed/uhyYlKnhUbM?si=_Zs-sdmIKX6STaYE",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/A1-choo-1.jpg", text: "Multi-color Printing - The most reliable multi-color system" },
      { image: "/images/A1-choo-2.jpg", text: "Full-auto Calibration - You don't have to do ANY manual tuning" },
      { image: "/images/A1-mini-choo-1.jpg", text: "Active Flow Rate Compensation" },
      { image: "/images/A1-mini-choo-2.jpg", text: "Plug-N-Play" },
      { image: "/images/A1-mini-choo-3.jpg", text: "Active Motor Noise Cancelling" },
      { image: "/images/A1-mini-choo-4.jpg", text: "Bed Slinger, with CoreXY Speed And Quality（High-Speed Precision）" },
      { image: "/images/A1-mini-choo-5.jpg", text: "Sync with Bambu Studio and Bambu Handy" }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
  {
    category: "Body",
    rows: [
      { label: "Build Volume (W*D*H)", value: "180*180*180 mm³" }
    ]
  },
  {
    category: "Toolhead",
    rows: [
      { label: "Hot End", value: "All-Metal" },
      { label: "Nozzle", value: "Stainless Steel" },
      { label: "Max Hot End Temperature", value: "300 °C" },
      {
        label: "Nozzle Diameter",
        value: `0.4 mm (Included)
0.2 mm, 0.6 mm, 0.8 mm`
      }
    ]
  },
  {
    category: "Heatbed",
    rows: [
      {
        label: "Build Plate",
        value: `Bambu Textured PEI Plate (Included)
Bambu Smooth PEI Plate`
      },
      { label: "Max Build Plate Temperature", value: "80°C" }
    ]
  },
  {
    category: "Speed",
    rows: [
      { label: "Max Speed of Tool Head", value: "500 mm/s" },
      { label: "Max Acceleration of Tool Head", value: "10000 mm/s²" }
    ]
  },
  {
    category: "Supported Filament",
    rows: [
      { label: "Supported Materials", value: "PLA, PETG, TPU, PVA" },
      {
        label: "Ideal Materials",
        value: `ABS, ASA, PC, PA, PET,
Carbon/Glass Fiber Reinforced Polymer`
      },
      { label: "Not Recommended", value: "-" }
    ]
  },
  {
    category: "Sensors",
    rows: [
      {
        label: "Monitoring Camera",
        value: `Low Framerate Camera (Up to 1080P)
Timelapse Supported`
      },
      { label: "Filament Run Out Sensor", value: "Yes" },
      { label: "Filament Odometry", value: "Yes" },
      { label: "Power Loss Recovery", value: "Yes" },
      { label: "Filament Tangle Sensor", value: "Yes" }
    ]
  },
  {
    category: "Physical Dimensions",
    rows: [
      {
        label: "A1 mini",
        value: "347*315*365 mm³"
      },
      {
        label: "Package Size",
        value: "385*430*460 mm³"
      },
      {
        label: "Net Weight",
        value: "5.5 kg"
      },
      {
        label: "Gross Weight",
        value: "8.2 kg"
      },
      {
        label: "A1 mini Combo Package Size",
        value: "385*430*495 mm³"
      },
      {
        label: "A1 mini Combo Gross Weight",
        value: "10.2 kg (AMS Lite Included)"
      }
    ]
  }
],
    // 8. What's in the Box
    inTheBox: [
      { name: "A1 mini combo", image: "/images/A1-mini-box-1.jpg" },
      { name: "Spool Holder", image: "/images/A1-mini-box-2.jpg" },
      { name: "Purge Wiper", image: "/images/A1-mini-box-3.jpg" },
      { name: "Build Plate", image: "/images/A1-mini-box-4.jpg" },
      { name: "PTFE Tube*1", image: "/images/A1-mini-box-5.jpg" },
      { name: "Bambu Filament Samples-20g(Random Color)", image: "/images/A1-mini-box-6.jpg" },
      { name: "Stainless Steel Nozzle（Included）", image: "/images/A1-mini-box-7.jpg" },
      { name: "Accessory Box", image: "/images/A1-mini-box-8.jpg" },
      { name: "AMS lite Stand", image: "/images/A1-mini-add-1.jpg" },
      { name: "AMS lite Body", image: "/images/A1-mini-add-2.jpg" },
      { name: "AMS lite Rotary Spool Holder (x4)", image: "/images/A1-mini-add-3.jpg" },
      { name: "PTFE Tube*3", image: "/images/A1-mini-add-4.jpg" },

    ],

  },

  {
    id: "M-005",
    code: "DC-BBL-3PR-006",
    name: "Bambu Lab A2L Combo 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/A2L-combo-1.jpg",
      "/images/A2L-combo-2.jpg",
      "/images/A2L-1.jpg",
      "/images/A2L-2.jpg",
      "/images/A2L-3.jpg",
      "/images/A2L-4.jpg",
      "/images/A2L-5.jpg",
      "/images/A2L-combo-3.jpg",
      "/images/A2L-combo-4.jpg",
      "/images/A2L-combo-5.jpg",
      "/images/A2L-combo-6.jpg"
    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "A2L Combo", image: "/images/A2L-1.jpg", price: "$399", id: "M-005" },
      { name: "A2L", image: "/images/A2L-combo-1.jpg", price: "$299", id: "M-006" }
    ],
    // 3. Features
    features: [
      "Expanded Build Volume: 330 x 320 x 325 mm³ for large-scale projects.",
      "Multi-Tool Ecosystem: Supports modular add-ons for blade cutting and pen plotting.",
      "Full-Auto Calibration: Hands-free leveling and offset for instant out-of-the-box printing.",
      "Pro-Scale Stability: Adaptive Vibration Compensation guarantees precision for heavy/tall models.",
      "AMS Integration: Reliable, high-performance multi-color and multi-material printing.",
      "Smartphone-Class UI: High-resolution touchscreen with a streamlined, user-centric interface.",
      "Indoor Safe: UL 2904 GREENGUARD certified for emission safety."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    productVideoId: "https://www.youtube.com/embed/vhBLetZHJK0?si=6YdppipPCek_gyrd",
    unboxingVideoId: "https://www.youtube.com/embed/eWPBXls2WkI?si=BFASwIGrzvnUv-Pj",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/A2L-choo-1.jpg", text: "Extra Large Build Volume - Oversized build in one go." },
      { image: "/images/A2L-choo-2.jpg", text: "Multi-Color Printing - The most reliable multi-color solution." },
      { image: "/images/A2L-choo-3.jpg", text: "Full-Auto Calibration - You don't have to do ANY manual tuning." },
      { image: "/images/A2L-choo-4.jpg", text: "Modular Add-Ons - Blade cutting, pen drawing and more." },
      { image: "/images/A2L-choo-5.jpg", text: "MakerWorld Ecosystem - Millions of models, one-click away." },
      { image: "/images/A2L-choo-6.jpg", text: "Intelligent Monitoring - AutoPilot your printing process." }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
  {
    category: "Body",
    rows: [
      { label: "Build Volume (W*D*H)", value: "330mm*320mm*325mm" },
      { label: "Chassis", value: "Aluminum and Steel" },
      { label: "Outer Frame", value: "Plastic" }
    ]
  },
  {
    category: "Dimensions and Weight",
    rows: [
      { label: "Physical Dimensions", value: "544mm*529mm*505mm" },
      {
        label: "Net Weight",
        value: `12.8 kg
Gross Weight (A2L): 17.0 kg
Gross Weight (A2L AMS Combo): 18.9 kg`
      }
    ]
  },
  {
    category: "Toolhead",
    rows: [
      { label: "Extruder Gear", value: "Hardened Steel" },
      { label: "Nozzle", value: "Stainless Steel" },
      { label: "Max Nozzle Temperature", value: "300 °C" },
      {
        label: "Supported Nozzle Diameter",
        value: "0.2 mm, 0.4 mm, 0.6 mm, 0.8 mm"
      },
      { label: "Filament Cutter", value: "Built-in" },
      { label: "Filament Diameter", value: "1.75 mm" },
      { label: "Extruder Motor", value: "Servo Extruder Motor" }
    ]
  },
  {
    category: "Heatbed",
    rows: [
      { label: "Build Plate Material", value: "Flexible Steel Plate" },
      { label: "Included Build Plate Type", value: "Textured PEI Plate" },
      {
        label: "Supported Build Plate Type",
        value: `Textured PEI Plate
Engineering Plate
Cool Plate SuperTack`
      },
      { label: "Max Heatbed Temperature", value: "80 ℃" }
    ]
  },
  {
    category: "Speed",
    rows: [
      { label: "Max Speed of Toolhead", value: "500 mm/s" },
      { label: "Max Acceleration of Toolhead", value: "10 m/s²" },
      {
        label: "Max Flow for Hotend",
        value: `28 mm³/s
(Test parameters: 150 mm round model with a single outer wall, Bambu Lab PLA Basic, 220°C printing temperature)`
      }
    ]
  },
  {
    category: "Cooling",
    rows: [
      { label: "Part Cooling Fan", value: "Closed Loop Control" },
      { label: "Hotend Cooling Fan", value: "Closed Loop Control" }
    ]
  },
  {
    category: "Supported Filament",
    rows: [
      { label: "Supported Filament Type", value: "PLA, PETG, TPU, PVA" },
      { label: "Suitable for Printing", value: "PLA-CF, PETG-CF" },
      {
        label: "Suitable with Hardened Steel Nozzle",
        value: "Carbon Fiber Reinforced Filaments"
      }
    ]
  },
  {
    category: "Sensors",
    rows: [
      {
        label: "Camera",
        value: `Low-frame-rate camera (up to 1080P)
Supports timelapse photography`
      },
      { label: "Filament Run Out Sensor", value: "Supported" },
      { label: "Filament Tangle Sensor", value: "Supported" },
      { label: "Filament Odometry", value: "Supported" },
      { label: "Power Loss Recovery", value: "Supported" },
      { label: "Clumping Detection", value: "Supported" }
    ]
  },
  {
    category: "Electrical Requirements",
    rows: [
      { label: "Voltage", value: "100-120 VAC, 50/60 Hz" },
      { label: "Max Power", value: "1000 W @ 110 V" }
    ]
  },
  {
    category: "Environment Requirement",
    rows: [
      { label: "Operating Temperature", value: "15 - 30 °C" }
    ]
  },
  {
    category: "Electronics",
    rows: [
      { label: "Touchscreen", value: "3.5 inch, 240*320 Touchscreen" },
      { label: "Storage", value: "32GB MicroSD Card" },
      {
        label: "Control Interface",
        value: "Touchscreen, Mobile App, PC App"
      },
      {
        label: "Motion Controller",
        value: "Single-core Cortex-M4 Processor & Single-core Cortex-M7 Processor"
      },
      {
        label: "Communication",
        value: "Wi-Fi, Bambu-Bus"
      }
    ]
  },
  {
    category: "Software",
    rows: [
      { label: "Slicer", value: "Bambu Studio" },
      {
        label: "Third-Party Slicers",
        value: "SuperSlicer, PrusaSlicer, Cura (advanced features may be limited)"
      },
      {
        label: "Supported Operating Systems",
        value: "macOS, Windows, Linux"
      }
    ]
  },
  {
    category: "Network",
    rows: [
      { label: "Network Control", value: "Ethernet (Not Available)" },
      { label: "Wireless Network", value: "2.4G Wi-Fi" }
    ]
  },
  {
    category: "Wi-Fi",
    rows: [
      {
        label: "Operating Frequency",
        value: `2412 - 2472 MHz (CE/MIC)
2412 - 2462 MHz (FCC)
2400 - 2483.5 MHz (SRRC)`
      },
      {
        label: "Transmitter Power (EIRP)",
        value: `<23 dBm (FCC)
<20 dBm (CE/SRRC)`
      },
      {
        label: "Protocol",
        value: "IEEE 802.11 b/g/n"
      }
    ]
  },
  {
    category: "Cutting Module",
    rows: [
      { label: "Cutting Area", value: "300mm * 300mm" },
      { label: "Drawing Area", value: "300mm * 255mm" },
      { label: "Supported Pen Diameter", value: "10.5mm–12.5mm" },
      {
        label: "Cutting Mat Type",
        value: "LightGrip and StrongGrip Cutting Mats"
      },
      { label: "Blade Type", value: "45° * 0.35mm" },
      { label: "Blade Pressure Range", value: "50 gf–600 gf" },
      { label: "Max Cutting Thickness", value: "0.5 mm" },
      { label: "Blade and Pen Recognition", value: "Supported" },
      { label: "Cutting Mat Type Detection", value: "Supported" },
      {
        label: "Supported Image Type",
        value: "Bitmap and Vector Images"
      },
      {
        label: "Supported Material Type",
        value: "Paper, PVC, Vinyl, Leather, and more"
      }
    ]
  }
],
    // 8. What's in the Box
    inTheBox: [
      { name: "A2L Combo", image: "/images/A2L-combo-1.jpg" },
      { name: "Tool Box", image: "/images/A2L-box-1.jpg" },
      { name: "Build Plate", image: "/images/A1-box-7.jpg" },
      { name: "Spool Holder", image: "/images/A2L-box-3.jpg" },
      { name: "AMS lite ", image: "/images/A2L-combo-box-1.jpg" },
      
    ],

  },

  {
    id: "M-006",
    code: "DC-BBL-3PR-005",
    name: "Bambu Lab A2L 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/A2L-1.jpg",
      "/images/A2L-2.jpg",
      "/images/A2L-3.jpg",
      "/images/A2L-4.jpg",
      "/images/A2L-5.jpg"

    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "A2L", image: "/images/A2L-combo-1.jpg", price: "$299", id: "M-006" },
      { name: "A2L Combo", image: "/images/A2L-1.jpg", price: "$399", id: "M-005" }
    ],
    // 3. Features
    features: [
      "Expanded Build Volume: 330 x 320 x 325 mm³ for large-scale projects.",
      "Multi-Tool Ecosystem: Supports modular add-ons for blade cutting and pen plotting.",
      "Full-Auto Calibration: Hands-free leveling and offset for instant out-of-the-box printing.",
      "Pro-Scale Stability: Adaptive Vibration Compensation guarantees precision for heavy/tall models.",
      "AMS Integration: Reliable, high-performance multi-color and multi-material printing.",
      "Smartphone-Class UI: High-resolution touchscreen with a streamlined, user-centric interface.",
      "Indoor Safe: UL 2904 GREENGUARD certified for emission safety."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    productVideoId: "https://www.youtube.com/embed/vhBLetZHJK0?si=6YdppipPCek_gyrd",
    unboxingVideoId: "https://www.youtube.com/embed/43UNZvhyqJk?si=NrDT_oawyg3dZuE0",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/A2L-choo-1.jpg", text: "Extra Large Build Volume - Oversized build in one go." },
      { image: "/images/A2L-choo-2.jpg", text: "Multi-Color Printing - The most reliable multi-color solution." },
      { image: "/images/A2L-choo-3.jpg", text: "Full-Auto Calibration - You don't have to do ANY manual tuning." },
      { image: "/images/A2L-choo-4.jpg", text: "Modular Add-Ons - Blade cutting, pen drawing and more." },
      { image: "/images/A2L-choo-5.jpg", text: "MakerWorld Ecosystem - Millions of models, one-click away." },
      { image: "/images/A2L-choo-6.jpg", text: "Intelligent Monitoring - AutoPilot your printing process." }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
  {
    category: "Body",
    rows: [
      { label: "Build Volume (W*D*H)", value: "330mm*320mm*325mm" },
      { label: "Chassis", value: "Aluminum and Steel" },
      { label: "Outer Frame", value: "Plastic" }
    ]
  },
  {
    category: "Dimensions and Weight",
    rows: [
      { label: "Physical Dimensions", value: "544mm*529mm*505mm" },
      {
        label: "Net Weight",
        value: `12.8 kg
Gross Weight (A2L): 17.0 kg
Gross Weight (A2L AMS Combo): 18.9 kg`
      }
    ]
  },
  {
    category: "Toolhead",
    rows: [
      { label: "Extruder Gear", value: "Hardened Steel" },
      { label: "Nozzle", value: "Stainless Steel" },
      { label: "Max Nozzle Temperature", value: "300 °C" },
      {
        label: "Supported Nozzle Diameter",
        value: "0.2 mm, 0.4 mm, 0.6 mm, 0.8 mm"
      },
      { label: "Filament Cutter", value: "Built-in" },
      { label: "Filament Diameter", value: "1.75 mm" },
      { label: "Extruder Motor", value: "Servo Extruder Motor" }
    ]
  },
  {
    category: "Heatbed",
    rows: [
      { label: "Build Plate Material", value: "Flexible Steel Plate" },
      { label: "Included Build Plate Type", value: "Textured PEI Plate" },
      {
        label: "Supported Build Plate Type",
        value: `Textured PEI Plate
Engineering Plate
Cool Plate SuperTack`
      },
      { label: "Max Heatbed Temperature", value: "80 ℃" }
    ]
  },
  {
    category: "Speed",
    rows: [
      { label: "Max Speed of Toolhead", value: "500 mm/s" },
      { label: "Max Acceleration of Toolhead", value: "10 m/s²" },
      {
        label: "Max Flow for Hotend",
        value: `28 mm³/s
(Test parameters: 150 mm round model with a single outer wall, Bambu Lab PLA Basic, 220°C printing temperature)`
      }
    ]
  },
  {
    category: "Cooling",
    rows: [
      { label: "Part Cooling Fan", value: "Closed Loop Control" },
      { label: "Hotend Cooling Fan", value: "Closed Loop Control" }
    ]
  },
  {
    category: "Supported Filament",
    rows: [
      { label: "Supported Filament Type", value: "PLA, PETG, TPU, PVA" },
      { label: "Suitable for Printing", value: "PLA-CF, PETG-CF" },
      {
        label: "Suitable with Hardened Steel Nozzle",
        value: "Carbon Fiber Reinforced Filaments"
      }
    ]
  },
  {
    category: "Sensors",
    rows: [
      {
        label: "Camera",
        value: `Low-frame-rate camera (up to 1080P)
Supports timelapse photography`
      },
      { label: "Filament Run Out Sensor", value: "Supported" },
      { label: "Filament Tangle Sensor", value: "Supported" },
      { label: "Filament Odometry", value: "Supported" },
      { label: "Power Loss Recovery", value: "Supported" },
      { label: "Clumping Detection", value: "Supported" }
    ]
  },
  {
    category: "Electrical Requirements",
    rows: [
      { label: "Voltage", value: "100-120 VAC, 50/60 Hz" },
      { label: "Max Power", value: "1000 W @ 110 V" }
    ]
  },
  {
    category: "Environment Requirement",
    rows: [
      { label: "Operating Temperature", value: "15 - 30 °C" }
    ]
  },
  {
    category: "Electronics",
    rows: [
      { label: "Touchscreen", value: "3.5 inch, 240*320 Touchscreen" },
      { label: "Storage", value: "32GB MicroSD Card" },
      {
        label: "Control Interface",
        value: "Touchscreen, Mobile App, PC App"
      },
      {
        label: "Motion Controller",
        value: "Single-core Cortex-M4 Processor & Single-core Cortex-M7 Processor"
      },
      {
        label: "Communication",
        value: "Wi-Fi, Bambu-Bus"
      }
    ]
  },
  {
    category: "Software",
    rows: [
      { label: "Slicer", value: "Bambu Studio" },
      {
        label: "Third-Party Slicers",
        value: "SuperSlicer, PrusaSlicer, Cura (advanced features may be limited)"
      },
      {
        label: "Supported Operating Systems",
        value: "macOS, Windows, Linux"
      }
    ]
  },
  {
    category: "Network",
    rows: [
      { label: "Network Control", value: "Ethernet (Not Available)" },
      { label: "Wireless Network", value: "2.4G Wi-Fi" }
    ]
  },
  {
    category: "Wi-Fi",
    rows: [
      {
        label: "Operating Frequency",
        value: `2412 - 2472 MHz (CE/MIC)
2412 - 2462 MHz (FCC)
2400 - 2483.5 MHz (SRRC)`
      },
      {
        label: "Transmitter Power (EIRP)",
        value: `<23 dBm (FCC)
<20 dBm (CE/SRRC)`
      },
      {
        label: "Protocol",
        value: "IEEE 802.11 b/g/n"
      }
    ]
  },
  {
    category: "Cutting Module",
    rows: [
      { label: "Cutting Area", value: "300mm * 300mm" },
      { label: "Drawing Area", value: "300mm * 255mm" },
      { label: "Supported Pen Diameter", value: "10.5mm–12.5mm" },
      {
        label: "Cutting Mat Type",
        value: "LightGrip and StrongGrip Cutting Mats"
      },
      { label: "Blade Type", value: "45° * 0.35mm" },
      { label: "Blade Pressure Range", value: "50 gf–600 gf" },
      { label: "Max Cutting Thickness", value: "0.5 mm" },
      { label: "Blade and Pen Recognition", value: "Supported" },
      { label: "Cutting Mat Type Detection", value: "Supported" },
      {
        label: "Supported Image Type",
        value: "Bitmap and Vector Images"
      },
      {
        label: "Supported Material Type",
        value: "Paper, PVC, Vinyl, Leather, and more"
      }
    ]
  }
],
    // 8. What's in the Box
    inTheBox: [
      { name: "A2L", image: "/images/A2L-1.jpg" },
      { name: "Tool Box", image: "/images/A2L-box-1.jpg" },
      { name: "Build Plate", image: "/images/A1-box-7.jpg" },
      { name: "Spool Holder", image: "/images/A2L-box-3.jpg" }
      
    ],

     addOns: [
      { name: "AMS lite", image: "/images/A2L-combo-box-1.jpg", variant: "A2L Combo" },
    ]

  },
  
  {
    id: "M-007",
    code: "DC-BBL-3PR-007",
    name: "Bambu Lab P1S 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/P1S-1.jpg",
      "/images/P1S-2.jpg",
      "/images/P1S-3.jpg",
      "/images/P1S-4.jpg",
      "/images/P1S-5.jpg"

    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "P1S", image: "/images/P1S-1.jpg", price: "$299", id: "M-007" },
      { name: "P1S Combo", image: "/images/P1S-combo-1.jpg", price: "$399", id: "M-008" }
    ],
    // 3. Features
    features: [
      "15-Minute Rapid Setup: From unboxing to your first print in just 15 minutes.",
      "Fully Enclosed Design: Print engineering-grade filaments safely and with total consistency.",
      "Multi-Color Versatility: Unlock limitless creativity with AMS-powered multi-material printing.",
      "Farm-Grade Reliability: Proven performance and uptime, trusted by professional print farms.",
      "Full-Scale Volume: A generous 256 × 256 × 256 mm³ build space for your large projects."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
    
    unboxingVideoId: "https://www.youtube.com/embed/6cv-PQWit3g?si=AslF7CwEFvoXqVh1",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/P1S-choo-1.jpg", text: "All-around performance right out of the box" },
      { image: "/images/P1S-choo-2.jpg", text: "Multi-color capability" },
      { image: "/images/P1S-choo-3.jpg", text: "Print fast with exceptional quality" },
      { image: "/images/P1S-choo-4.jpg", text: "Fully loaded with advanced features" },
      { image: "/images/P1S-choo-5.jpg", text: "Sync with Bambu Studio and Bambu Handy" }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
  {
    category: "Printing Technology",
    rows: [
      {
        label: "Technology",
        value: "Fused Deposition Modeling"
      }
    ]
  },
  {
    category: "Body",
    rows: [
      {
        label: "Build Volume (W × D × H)",
        value: "256 × 256 × 256 mm³"
      },
      {
        label: "Chassis",
        value: "Steel"
      },
      {
        label: "Shell",
        value: "Plastic & Glass"
      }
    ]
  },
  {
    category: "Toolhead",
    rows: [
      { label: "Hot End", value: "All-Metal" },
      { label: "Extruder Gears", value: "Steel" },
      { label: "Nozzle", value: "Stainless Steel" },
      { label: "Max Hot End Temperature", value: "300 °C" },
      { label: "Nozzle Diameter (Included)", value: "0.4 mm" },
      {
        label: "Nozzle Diameter (Optional)",
        value: "0.2 mm, 0.6 mm, 0.8 mm"
      },
      { label: "Filament Cutter", value: "Yes" },
      { label: "Filament Diameter", value: "1.75 mm" }
    ]
  },
  {
    category: "Heatbed",
    rows: [
      {
        label: "Build Plate (Included)",
        value: "Bambu Dual-Sided Textured PEI Plate"
      },
      {
        label: "Build Plate (Optional)",
        value: `Bambu Cool Plate
Bambu Engineering Plate
Bambu High Temperature Plate`
      },
      {
        label: "Max Build Plate Temperature",
        value: "100 °C"
      }
    ]
  },
  {
    category: "Speed",
    rows: [
      { label: "Max Speed of Toolhead", value: "500 mm/s" },
      { label: "Max Acceleration of Toolhead", value: "20 m/s²" },
      {
        label: "Max Hot End Flow",
        value: `32 mm³/s @ ABS
(Model: 150×150mm single wall;
Material: Bambu ABS;
Temperature: 280°C)`
      }
    ]
  },
  {
    category: "Cooling & Filtration",
    rows: [
      { label: "Part Cooling Fan", value: "Closed Loop Control" },
      { label: "Hot End Fan", value: "Closed Loop Control" },
      { label: "Control Board Fan", value: "Closed Loop Control" },
      {
        label: "Chamber Temperature Regulator Fan",
        value: "Closed Loop Control"
      },
      {
        label: "Auxiliary Part Cooling Fan",
        value: "Closed Loop Control"
      },
      {
        label: "Air Filter",
        value: "Activated Carbon Filter"
      }
    ]
  },
  {
    category: "Supported Filament",
    rows: [
      {
        label: "Supported",
        value: "PLA, PETG, TPU, ABS, ASA, PVA, PET"
      },
      {
        label: "Ideal",
        value: "PA, PC"
      },
      {
        label: "Not Recommended",
        value: "Carbon/Glass Fiber Reinforced Polymer"
      }
    ]
  },
  {
    category: "Sensors",
    rows: [
      {
        label: "Chamber Monitoring Camera",
        value: `Low Rate Camera
1280 × 720 / 0.5 fps
Timelapse Supported`
      },
      {
        label: "Filament Run Out Sensor",
        value: "Yes"
      },
      {
        label: "Filament Odometry",
        value: "Optional with AMS"
      },
      {
        label: "Power Loss Recovery",
        value: "Yes"
      }
    ]
  },
  {
    category: "Physical Dimensions",
    rows: [
      {
        label: "Dimensions (W × D × H)",
        value: "389 × 389 × 458 mm³"
      },
      {
        label: "Net Weight",
        value: "12.95 kg"
      }
    ]
  },
  {
    category: "Electrical Parameters",
    rows: [
      {
        label: "Input Voltage",
        value: "100-240 VAC, 50/60 Hz"
      },
      {
        label: "Max Power",
        value: "1000 W @ 220V, 350 W @ 110V"
      },
      {
        label: "USB Output Power",
        value: "5V / 1.5A"
      }
    ]
  },
  {
    category: "Electronics",
    rows: [
      {
        label: "Display",
        value: "2.7-inch 192×64 Screen"
      },
      {
        label: "Storage",
        value: "Micro SD Card"
      },
      {
        label: "Control Interface",
        value: "Button, APP, PC Application"
      },
      {
        label: "Motion Controller",
        value: "Dual-Core Cortex M4"
      }
    ]
  },
  {
    category: "Connectivity",
    rows: [
      {
        label: "Connectivity",
        value: "Wi-Fi, Bluetooth, Bambu-Bus"
      }
    ]
  },
  {
    category: "Software",
    rows: [
      {
        label: "Slicer",
        value: "Bambu Studio"
      },
      {
        label: "Supported OS",
        value: "macOS, Windows"
      },
      {
        label: "Third-Party Slicer Support",
        value: "SuperSlicer, PrusaSlicer, Cura (standard G-code export)"
      }
    ]
  }
],
    // 8. What's in the Box
    inTheBox: [
      { name: "Bambu Lab P1S", image: "/images/P1S-box-01.jpg" },
      { name: "Stainless Steel Hotend with Nozzle", image: "/images/P1S-box-1.jpg" },
      { name: "Build Plate", image: "/images/P1S-box-2.jpg" },
      { name: "Bambu PLA Filament(with a spool) (*This will not be included in P1S AMS 2 Pro Combo)", image: "/images/P1S-box-3.jpg" },
      { name: "Unclogging Pin Tool", image: "/images/P1S-4.jpg" },
      { name: "Power Cable", image: "/images/P1S-box-5.jpg" },
      { name: "Accessory Box", image: "/images/P1S-box-6.jpg" },
      
    ],

     addOns: [
      { name: "Bambu Lab AMS", image: "/images/P1S-add-1.jpg", variant: "P1S Combo" },
      { name: "Spare Filament Cutter (x2)", image: "/images/P1S-add-2.jpg", variant: "P1S Combo" },
      { name: "Bambu Bus Cable-6Pin", image: "/images/P1S-add-3.jpg", variant: "P1S Combo" },
      { name: "Bambu Bus Cable-4Pin", image: "/images/P1S-add-4.jpg", variant: "P1S Combo" },
      { name: "Bambu Filament Samples (Random Color/Type，Contains 2 spools)", image: "/images/P1S-add-5.jpg", variant: "P1S Combo" }
    ]

  },

  {
    id: "M-008",
    code: "DC-BBL-3PR-008",
    name: "Bambu Lab P1S Combo 3D Printer",
    price: "$399",
    whatsappNumber: "94711609341",
    category: "3D Printers",
    // 1. Image Gallery
    images: [
      "/images/P1S-combo-1.jpg",
      "/images/P1S-2.jpg",
      "/images/P1S-3.jpg",
      "/images/P1S-4.jpg",
      "/images/P1S-5.jpg"

    ],
    // 2. Variants (Links to other machine IDs)
    variants: [
      { name: "P1S Combo", image: "/images/P1S-combo-1.jpg", price: "$399", id: "M-008" },
      { name: "P1S", image: "/images/P1S-1.jpg", price: "$299", id: "M-007" }
    ],
    // 3. Features
    features: [
      "15-Minute Rapid Setup: From unboxing to your first print in just 15 minutes.",
      "Fully Enclosed Design: Print engineering-grade filaments safely and with total consistency.",
      "Multi-Color Versatility: Unlock limitless creativity with AMS-powered multi-material printing.",
      "Farm-Grade Reliability: Proven performance and uptime, trusted by professional print farms.",
      "Full-Scale Volume: A generous 256 × 256 × 256 mm³ build space for your large projects."
    ],
    // 4. Accessories
    // accessories: [
    //   { name: "Purge Wiper - A1 Series", price: "$3.49", image: "/images/A1-fea-1.jpg", code: "ACC-01" },
    //   { name: "Replacement Filament Cutter", price: "$2.09", image: "/images/A1-fea-2.jpg", code: "ACC-02" }
    // ],
    // 5. YouTube Embed IDs
   
    unboxingVideoId: "https://www.youtube.com/embed/1Thb5LgGxUM?si=8_dztpAirKUNNpMh",
    // 6. Why Choose Cards
    whyChoose: [
      { image: "/images/P1S-choo-1.jpg", text: "All-around performance right out of the box" },
      { image: "/images/P1S-choo-2.jpg", text: "Multi-color capability" },
      { image: "/images/P1S-choo-3.jpg", text: "Print fast with exceptional quality" },
      { image: "/images/P1S-choo-4.jpg", text: "Fully loaded with advanced features" },
      { image: "/images/P1S-choo-5.jpg", text: "Sync with Bambu Studio and Bambu Handy" }
    ],
    // 7. Tech Specs Table (Structured for easy mapping)
    specs: [
  {
    category: "Printing Technology",
    rows: [
      {
        label: "Technology",
        value: "Fused Deposition Modeling"
      }
    ]
  },
  {
    category: "Body",
    rows: [
      {
        label: "Build Volume (W × D × H)",
        value: "256 × 256 × 256 mm³"
      },
      {
        label: "Chassis",
        value: "Steel"
      },
      {
        label: "Shell",
        value: "Plastic & Glass"
      }
    ]
  },
  {
    category: "Toolhead",
    rows: [
      { label: "Hot End", value: "All-Metal" },
      { label: "Extruder Gears", value: "Steel" },
      { label: "Nozzle", value: "Stainless Steel" },
      { label: "Max Hot End Temperature", value: "300 °C" },
      { label: "Nozzle Diameter (Included)", value: "0.4 mm" },
      {
        label: "Nozzle Diameter (Optional)",
        value: "0.2 mm, 0.6 mm, 0.8 mm"
      },
      { label: "Filament Cutter", value: "Yes" },
      { label: "Filament Diameter", value: "1.75 mm" }
    ]
  },
  {
    category: "Heatbed",
    rows: [
      {
        label: "Build Plate (Included)",
        value: "Bambu Dual-Sided Textured PEI Plate"
      },
      {
        label: "Build Plate (Optional)",
        value: `Bambu Cool Plate
Bambu Engineering Plate
Bambu High Temperature Plate`
      },
      {
        label: "Max Build Plate Temperature",
        value: "100 °C"
      }
    ]
  },
  {
    category: "Speed",
    rows: [
      { label: "Max Speed of Toolhead", value: "500 mm/s" },
      { label: "Max Acceleration of Toolhead", value: "20 m/s²" },
      {
        label: "Max Hot End Flow",
        value: `32 mm³/s @ ABS
(Model: 150×150mm single wall;
Material: Bambu ABS;
Temperature: 280°C)`
      }
    ]
  },
  {
    category: "Cooling & Filtration",
    rows: [
      { label: "Part Cooling Fan", value: "Closed Loop Control" },
      { label: "Hot End Fan", value: "Closed Loop Control" },
      { label: "Control Board Fan", value: "Closed Loop Control" },
      {
        label: "Chamber Temperature Regulator Fan",
        value: "Closed Loop Control"
      },
      {
        label: "Auxiliary Part Cooling Fan",
        value: "Closed Loop Control"
      },
      {
        label: "Air Filter",
        value: "Activated Carbon Filter"
      }
    ]
  },
  {
    category: "Supported Filament",
    rows: [
      {
        label: "Supported",
        value: "PLA, PETG, TPU, ABS, ASA, PVA, PET"
      },
      {
        label: "Ideal",
        value: "PA, PC"
      },
      {
        label: "Not Recommended",
        value: "Carbon/Glass Fiber Reinforced Polymer"
      }
    ]
  },
  {
    category: "Sensors",
    rows: [
      {
        label: "Chamber Monitoring Camera",
        value: `Low Rate Camera
1280 × 720 / 0.5 fps
Timelapse Supported`
      },
      {
        label: "Filament Run Out Sensor",
        value: "Yes"
      },
      {
        label: "Filament Odometry",
        value: "Optional with AMS"
      },
      {
        label: "Power Loss Recovery",
        value: "Yes"
      }
    ]
  },
  {
    category: "Physical Dimensions",
    rows: [
      {
        label: "Dimensions (W × D × H)",
        value: "389 × 389 × 458 mm³"
      },
      {
        label: "Net Weight",
        value: "12.95 kg"
      }
    ]
  },
  {
    category: "Electrical Parameters",
    rows: [
      {
        label: "Input Voltage",
        value: "100-240 VAC, 50/60 Hz"
      },
      {
        label: "Max Power",
        value: "1000 W @ 220V, 350 W @ 110V"
      },
      {
        label: "USB Output Power",
        value: "5V / 1.5A"
      }
    ]
  },
  {
    category: "Electronics",
    rows: [
      {
        label: "Display",
        value: "2.7-inch 192×64 Screen"
      },
      {
        label: "Storage",
        value: "Micro SD Card"
      },
      {
        label: "Control Interface",
        value: "Button, APP, PC Application"
      },
      {
        label: "Motion Controller",
        value: "Dual-Core Cortex M4"
      }
    ]
  },
  {
    category: "Connectivity",
    rows: [
      {
        label: "Connectivity",
        value: "Wi-Fi, Bluetooth, Bambu-Bus"
      }
    ]
  },
  {
    category: "Software",
    rows: [
      {
        label: "Slicer",
        value: "Bambu Studio"
      },
      {
        label: "Supported OS",
        value: "macOS, Windows"
      },
      {
        label: "Third-Party Slicer Support",
        value: "SuperSlicer, PrusaSlicer, Cura (standard G-code export)"
      }
    ]
  }
],
    // 8. What's in the Box
    inTheBox: [
      { name: "Bambu Lab P1S Combo", image: "/images/P1S-combo-1.jpg" },
      { name: "Stainless Steel Hotend with Nozzle", image: "/images/P1S-box-1.jpg" },
      { name: "Build Plate", image: "/images/P1S-box-2.jpg" },
      { name: "Bambu PLA Filament(with a spool) (*This will not be included in P1S AMS 2 Pro Combo)", image: "/images/P1S-box-3.jpg" },
      { name: "Unclogging Pin Tool", image: "/images/P1S-4.jpg" },
      { name: "Power Cable", image: "/images/P1S-box-5.jpg" },
      { name: "Accessory Box", image: "/images/P1S-box-6.jpg" },
      { name: "Bambu Lab AMS", image: "/images/P1S-add-1.jpg" },
      { name: "Spare Filament Cutter (x2)", image: "/images/P1S-add-2.jpg" },
      { name: "Bambu Bus Cable-6Pin", image: "/images/P1S-add-3.jpg" },
      { name: "Bambu Bus Cable-4Pin", image: "/images/P1S-add-4.jpg" },
      { name: "Bambu Filament Samples (Random Color/Type，Contains 2 spools)", image: "/images/P1S-add-5.jpg" },
      
    ],

  },
  // Add your next machine here...
];