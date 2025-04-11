requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function follow_ghost_legs_visualization(tgt_node, data) {
            /**
             * attr
             */
            const attr = {
                'top_numbers': {
                    'font-size': '14px',
                    'font-family': 'Times',
                    'font-weight': 'bold',
                    'fill': '#294270',
                },
                'bottom_numbers': {
                    'font-size': '14px',
                    'font-family': 'Times',
                    'font-weight': 'bold',
                    'fill': '#F0801A',
                },
                'lines': {
                    'stroke-width': '2.5px',
                    'stroke': '#294270',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                },
            }
            /**
             * values
             */
            const input = data.in
            const os = 10
            const number_height = 20
            const lead_length = 17
            const v_unit = 20
            const unit = Math.min(200 / input[0], 30)
            const grid_seize_px_w = unit * (input[0] - 1) + os * 2
            const last_leg_positions = Array(input[0] + 1)
            const each_leg_positions = []
            last_leg_positions.fill(-1)
            input[1].forEach(o => {
                const [a, b] = o.values
                last_leg_positions[a] = Math.max(...last_leg_positions.slice(a - 1, a + 2)) + 1
                each_leg_positions.push(last_leg_positions[a])
            })
            const leg_num = Math.max(...last_leg_positions)
            const grid_seize_px_h = v_unit * leg_num + (number_height + lead_length + os) * 2
            /**
             * paper
             */
            const paper = Raphael(tgt_node, grid_seize_px_w, grid_seize_px_h)
            /**
             * draw top numbers
             */
            for (let i = 0; i < input[0]; i += 1) {
                paper.text(os + unit * i, os + number_height / 2, i + 1).attr(attr.top_numbers)
            }
            /**
             * draw vertical lines
             */
            for (let i = 0; i < input[0]; i += 1) {
                paper.path(
                    [
                        'M', i * unit + os, os + number_height,
                        'v', leg_num * v_unit + lead_length * 2
                    ]
                ).attr(attr.lines)
            }
            /**
             * draw horizontal lines
             */
            input[1].forEach((o, i) => {
                const [a, b] = o.values
                paper.path(
                    [
                        'M', (a - 1) * unit + os,
                        each_leg_positions[i] * v_unit + lead_length + os + number_height,
                        'h', unit
                    ]
                ).attr(attr.lines)
            })
            /**
             * get bottom numbers
             */
            let result = []
            for (let i = 1; i <= input[0]; i += 1) {
                let n = i
                input[1].forEach(o => {
                    const [a, b] = o.values
                    if (n === a) {
                        n = b
                    } else if (n === b) {
                        n = a
                    }
                })
                result.push([n, i])
            }
            const bottom_numbers = result.sort((a, b) => parseInt(a) - parseInt(b)).map(([a, b]) => b)
            /**
             * draw bottom numbers
             */
            bottom_numbers.forEach((b, i) => {
                paper.text(os + unit * i,
                    os + number_height + lead_length * 2 + v_unit * leg_num + number_height / 2,
                    b).attr(attr.bottom_numbers)
            })
        }
        var io = new extIO({
            animation: function ($expl, data) {
                follow_ghost_legs_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
