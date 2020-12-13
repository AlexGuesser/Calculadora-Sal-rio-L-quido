import React, { Component } from "react";
import Display from "./components/Display";
import Input from "./components/Input";
import Title from "./components/Title";
import Bar from "./components/Bars";
import css from "./css/container.module.css";
import { calculateSalaryFrom } from "./helpers/salary";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      salarioBruto: 1000,
      baseInss: "0",
      descontoInss: "0",
      baseIrpf: "0",
      descontoIrpf: "0",
      salarioLiquido: "0",
      perctInss: 0,
      perctIrpf: 0,
      perctSalario: 100,
    };
  }

  componentDidMount() {
    this.calculateSalary(this.state.salarioBruto);
  }

  toLocaleString = (float) => {
    return float.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  calculateSalary = (salarioBruto) => {
    const result = calculateSalaryFrom(parseFloat(salarioBruto));
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = result;

    let perctInss = 0;
    let perctIrpf = 0;
    let perctSalario = 0;

    if (salarioBruto === "0") {
      perctInss = (0).toFixed(2);
      perctIrpf = (0).toFixed(2);
      perctSalario = (100).toFixed(2);
    } else {
      perctInss = ((discountINSS / salarioBruto) * 100).toFixed(2);
      perctIrpf = ((discountIRPF / salarioBruto) * 100).toFixed(2);
      perctSalario = ((netSalary / salarioBruto) * 100).toFixed(2);
    }

    console.log(perctInss);
    console.log(perctIrpf);
    console.log(perctSalario);

    this.setState({
      baseInss: this.toLocaleString(baseINSS),
      descontoInss: `${this.toLocaleString(discountINSS)} (${perctInss}%)`,
      baseIrpf: this.toLocaleString(baseIRPF),
      descontoIrpf: `${this.toLocaleString(discountIRPF)} (${perctIrpf}%)`,
      salarioLiquido: `${this.toLocaleString(netSalary)} (${perctSalario}%)`,
      perctInss: perctInss,
      perctIrpf: perctIrpf,
      perctSalario: perctSalario,
    });
  };

  render() {
    const {
      baseInss,
      descontoInss,
      baseIrpf,
      descontoIrpf,
      salarioLiquido,
    } = this.state;
    return (
      <div className={css.container}>
        <Title />
        <Input
          onChange={this.calculateSalary}
          description="Salário Bruto"
          id="salario-bruto"
        />
        <div className={css.displays}>
          <span className={css.display}>
            <Display
              description="Base INSS"
              id="Base INSS"
              value={baseInss}
              color="black"
            />
          </span>
          <span className={css.display}>
            <Display
              description="Desconto INSS"
              id="DescontoINSS"
              value={descontoInss}
              color="orange"
            />
          </span>
          <span className={css.display}>
            <Display
              description="Base IRPF"
              id="Base IRPF"
              value={baseIrpf}
              color="black"
            />
          </span>
          <span className={css.display}>
            <Display
              description="Desconto IRPF"
              id="DescontoIRPF"
              value={descontoIrpf}
              color="red"
            />
          </span>
        </div>
        <div className={css.displays}>
          <span>
            <Display
              description="Salário Líquido"
              id="SalárioLíquido"
              value={salarioLiquido}
              color="green"
            />
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bar value={this.state.perctIrpf} color="red" />
          <Bar value={this.state.perctInss} color="orange" />
          <Bar value={this.state.perctSalario} color="green" />
        </div>
      </div>
    );
  }
}
